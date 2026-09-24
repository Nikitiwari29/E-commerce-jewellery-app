const mongoose=require("mongoose");

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{         
        type:String,
        required:true,
        unique:true 
    },
    password:{
        type:String,
        required:true
    },
    resetPasswordToken:{
        type:String
    },
    resetPasswordExpires:{
        type:Date
    },
    cart:[{
        productId:{
            type:Number,
            required:true
        },
        quantity:{
            type:Number,
            default:1
        }}],
    wishlist:[{
        productId:{
            type:Number,
            required:true
        }}]
    
});

module.exports=mongoose.model("User",userSchema);