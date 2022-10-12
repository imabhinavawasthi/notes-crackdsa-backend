import user from "../../models/user.js";

export const todoList=async(req,res)=>{
    try {
        const list=await user.findById(req.userId)
        .select("-password")
        .populate("todos")
        .exec()

        return res.json({message:"todo list",data:list})


    } catch (error) {
        res.json(error);
    }
}