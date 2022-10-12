import mongoose from "mongoose";

const otpSchema=mongoose.Schema({
    email:{
        type:String,
        required:true
    }
    ,
    otp:{
        type:Number,
        required:true
    }
    ,
    createdAt:{
        type:Date,
        required:true
    }
    ,
    expiresAt:{
        type:Date,
        required:true
    }
})

export default mongoose.model("otpSend",otpSchema);