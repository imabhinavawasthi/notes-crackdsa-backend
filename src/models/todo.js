import mongoose from "mongoose";

const todoSchema=mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    }
    ,
    title:{
        type:String,
        required:true
    }
    ,
    description:{
        type:String
    }
    ,
    isSolved:{
        type:Boolean,
        required:true,
        default:false
    }
    ,
    link:{
        type:String
    }
    ,
    topic:{
        type:String
    }
    , 
    date:{
        type:Date,
        default:Date.now
    }
    ,
    deleted:{
        type:Boolean,
        default:false
    }
    ,
    platform:{
        type:String
    }
})

export default mongoose.model("todo",todoSchema);