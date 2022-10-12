import mongoose from "mongoose";

const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    }
    ,
    password:{
        type:String,
        required:true
    }
    ,
    email:{
        type:String,
        required:true
    }
    ,
    college:{
        type:String,
        required:true
    }
    ,
    verified:{
        type:Boolean,
        required:true
    }
})

export default mongoose.model("user",userSchema);