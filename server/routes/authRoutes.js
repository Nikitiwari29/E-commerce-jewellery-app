const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto=require('crypto');
const User = require('../models/User');
const nodemailer = require("nodemailer");

const router = express.Router();

const transporter = nodemailer.createTransport({
    service :"gmail",
    auth:{
        user:process.env.EMAIL_USER,
        pass:process.env.EMAIL_PASS
    }
});

router.post("/login", async (req, res) => {
    try{
        const{email,password}=req.body;
        const user=await User.findOne({email});
        if(!user){
            return res.status(400).json({message:"User not found"});
        }

        const isPasswordCorrect=await bcrypt.compare(password,user.password);

        if(!isPasswordCorrect){
            return res.status(400).json({message:"Invalid credentials"});
        }
        const token=jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:"1d"});
        res.json({
            message:"Login successful",
            token,
            user:{
                id:user._id,
                name:user.name,
                email:user.email
            }
        });

    }
    catch(error){
        console.log(error);
        res.status(500).json({message:"Internal server error"});
    }
});

router.post("/signup",async (req,res)=>{
    try{
        const {name,email,password}=req.body;
        const existingUser=await User.findOne({email});

        if(existingUser){
            return res.status(400).json({message:"User already exists"});
        }
        const hashedPassword=await bcrypt.hash(password,10);
        const user=await User.create({
            name,
            email,
            password:hashedPassword
        });
        res.status(201).json({
            message:"User created successfully",
            user:{
                id:user._id,
                name:user.name,
                email:user.email
            }
        });
    }catch(error){
        console.log(error);
        res.status(500).json({message:"Internal server error",error:error.message});
    }
});


router.post("/forgot-password",async(req,res)=>{
    try{
        const {email}=req.body;

        if(!email){
            return res.status(400).json({
            message:"Email is required "
            });
        }

        const user=await User.findOne({email});

        if(!user){
            return res.status(404).json({
                message:"User not Found"
            });
        };
        const resetToken = crypto.randomBytes(32).toString("hex");

        user.resetPasswordToken=resetToken;

        user.resetPasswordExpires=Date.now() +15 *60*1000;

        await user.save();

        console.log("Reset token",resetToken);

        const resetLink = `http://localhost:5173/reset-password/${resetToken}`;

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to:user.email,
            subject:"Krisnaa jewellers - Password Reset" ,
            html:`
            <h2> Password Reset</h2>

        <p>Hello ${user.name},</p>

        <p>You requested to reset your password.</p>

        <p>Click the button below to reset your password:</p>

        <a href="${resetLink}"
           style="
             display:inline-block;
             padding:10px 20px;
             background-color:#3b82f6;
             color:white;
             text-decoration:none;
             border-radius:5px;
           ">
           Reset Password
        </a>

        <p>This link will expire in 15 minutes.</p>

        <p>If you did not request this, you can ignore this email.</p>`
        })

        res.json({
            message:"Password reset link sent to your email",
            
        });

    }catch(error){
        console.log(error);

        res.status(500).json({
            message:"Internal Server Error"
       });
    }
});

router.post("/reset-password/:token",async(req,res)=>{
    try{
        const {token}=req.params;
        const {password}=req.body;

        if(!password){
            return res.status(400).json({
                message:"Password is required"
            });
        }

        const user = await User.findOne({
            resetPasswordToken:token,
            resetPasswordExpires:{$gt:Date.now()}
        });

        if(!user){
            return res.status(400).json({
                message:"Invalid or Expired reset Token"
            });
        }

        const hashedPassword = await bcrypt.hash(password,10);

        user.password = hashedPassword;

        user.resetPasswordToken=undefined;
        user.resetPasswordExpires=undefined;

        await user.save();

        res.json({
            message:"Password reset successfully"
        });

    }catch(error){
        console.log(error)
        res.status(500).json({
            message:"Internal server Error"
        });
    };
});

module.exports=router;