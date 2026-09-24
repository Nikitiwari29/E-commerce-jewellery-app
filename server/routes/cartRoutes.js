const express=require("express");
const User=require("../models/User");
const authMiddleware=require("../middleware/authMiddleware");

const router=express.Router();

router.get("/",authMiddleware,async (req,res)=>{
    try{
        const user=await User.findById(req.user).select("-password");
    if(!user){
        return res.status(404).json({message:"User not found"});

    }
    res.json(
        {
            cart:user.cart
        }

    )
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:"Internal server error"});
    }
})

router.put("/update/:productId",authMiddleware,async(req,res)=>{
    try{
        const productId = Number(req.params.productId)
        const quantity = Number(req.body.quantity);



        if(quantity < 1){
            return res.status(400).json({
                message:"Quantity must be at least 1"
            });
        }
        const user = await User.findById(req.user);


        if(!user){
            return res.status(400).json({message:"User not Found"});
        }

        

        const cartItem = user.cart.find(
            item=>Number(item.productId) === productId
        );

    

        if(!cartItem){
            return res.status(404).json({ message: "Product not Found in the cart"});
        }

        cartItem.quantity=quantity;

        await user.save();

        res.json({
            message:"Cart quantity updated",
            cart:user.cart
        });
    }
    catch(error){
        console.error(error)

        res.status(500).json({message:"Internal Server Error",error:error.message})
    }
})


router.post("/add",authMiddleware,async (req,res)=>{
    try{
        const {productId}=req.body;

        if(!productId){
            return res.status(400).json({message:"Product ID is required"});
        }
        const user=await User.findById(req.user);
        if(!user){
            return res.status(404).json({message:"User not found"});
        }
        const existingItem=user.cart.find(item=>item.productId===Number(productId));
        if(existingItem){
            existingItem.quantity+=1;}
        else{
            user.cart.push({productId: Number(productId),quantity:1});
        }
        await user.save();
        res.json({message:"Product added to cart",cart:user.cart});
    } 
    catch(error){
        console.log(error);
        res.status(500).json({message:"Internal server error"});
    }
})

router.delete("/remove/:productId",authMiddleware,async (req,res)=>{
    try{
        const productId=Number(req.params.productId);

        const user = await User.findById(req.user);
        
        if(!user){
            return res.status(404).json({
                message:"User not Found"
            });
        }

        user.cart = user.cart.filter(
            item=>item.productId !== productId
        );
        await user.save();

        res.json({
            message:"Product removed from Cart",
            cart:user.cart
        });
    }
    catch(error){
        console.log(error)

        res.status(500).json({
            message:"Internal server error"
        });
    }
})

router.delete("/clear",authMiddleware,async(req,res)=>{
    try{
        const user = await User.findById(req.user);

        if(!user){
            return res.status(404).json({
                message:"User not found"
            });
        }

        user.cart=[];
        await user.save();

        res.json({
            message:"Cart cleared successfully",
            cart:user.cart
        });
    }
    catch(error){
        console.log(error);

        res.status(500).json({
            message:"Internal server error"
        })
    }
})

module.exports=router;