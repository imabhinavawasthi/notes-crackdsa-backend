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
    todos:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"todo"
        }
    ]

    ,

    verified:{
        type:Boolean,
        required:true
    }
    ,
    date:{
        type:Date,
        default:Date.now
    }
})

export default mongoose.model("user",userSchema);