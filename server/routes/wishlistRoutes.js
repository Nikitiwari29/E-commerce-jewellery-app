const express = require("express")
const User = require("../models/User");
const authMiddleware=require("../middleware/authMiddleware");

const router = express.Router();

router.get("/",authMiddleware,async(req,res)=>{
    try{
        const user=await User.findById(req.user);
        if(!user){
            return res.status(400).json({
                message:"User not found"
            });
        }
        res.json(user.wishlist);

    }
    catch(error){
        console.log(error);

        res.status(500).json({
            message:"Internal server Error"
        });
    }
});

router.post("/add",authMiddleware,async (req,res)=>{
    try{
        const {productId}=req.body;

        const user = await User.findById(req.user);

        if(!user){
            return res.status(404).json({
                message:"user not found"
            });
        }
        const alreadyExists=user.wishlist.some(
            item=>item.productId===productId
        );

        if(alreadyExists){
            return res.status(400).json({
                message:"product already in wishlist"
            });
        }
        user.wishlist.push({
            productId:productId
        });
        await user.save();

        res.status(201).json({
            message:"Product added to Wishlist",
            wishlist:user.wishlist
        });

    }
    catch(error){
        console.log(error);

        res.status(500).json({
            message:"Internal server Error"
        })
    }
});

router.delete("/remove/:productId",authMiddleware,async (req,res)=>{
    try{
        const productId = Number(req.params.productId);

        const user = await User.findById(req.user);

        if(!user){
            return res.status(404).json({
                message:"User not found"
            });
        }
        user.wishlist=user.wishlist.filter(
            item=>item.productId !== productId
        );
        await user.save();

        res.json({
            message:"Product removed from wishlist",
            wishlist:user.wishlist
        });
    }
    catch(error){
        console.log(error);

        res.status(500).json({
            message:"Internal server error"
        });
    }
})

module.exports=router;