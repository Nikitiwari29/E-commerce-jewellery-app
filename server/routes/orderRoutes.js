const express = require("express");
const Order = require("../models/Order");
const authMiddleware=require("../middleware/authMiddleware");

const router = express.Router();

router.post("/",authMiddleware,async (req,res)=>{
    try{
        const {
            items,
            total,
            customerDetails,
            paymentMethod,
        } = req.body;

        if(!items || items.length === 0){
            return res.status(400).json({
                message:"Cart is empty",
            });
        }

        const newOrder = new Order({
            userId:req.user,
            items,
            total,
            customerDetails,
            paymentMethod:paymentMethod || "Cash on delivery",
        });

        const savedOrder = await newOrder.save();

        res.status(201).json({
            message:"Order placed successfully",
            order:savedOrder,
        });

    }
    catch(error){
        console.error("Create order error:",error);

        res.status(500).json({
            message:"Failed to create order",
        });
    }
});

router.get("/",authMiddleware,async (req,res)=>{
    try{
        const orders = await Order.find({
            userId:req.user,
        }).sort({createdAt:-1});
        res.json({
            orders,
        });
    }
    catch(error){
        console.error("Get order error:",error);

        res.status(500).json({
            message:"Failed to fetch orders",
        });
    }
});

module.exports=router;