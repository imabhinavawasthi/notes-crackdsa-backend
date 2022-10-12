import todo from "../../models/todo.js";
import user from "../../models/user.js";

export const deleteTodo=async(req,res)=>{
    try {
        const result=await todo.findOneAndDelete({
            userId:req.userId,
            _id:req.body.todo_id
        })


        if(result){
            const curruser=await user.findOneAndUpdate({
                _id:req.userId
            },{
                $pull:{
                    todos:req.body.todo_id
                }
            })
        }

        res.json({message:"deleted"})
    } catch (error) {
        res.json(error);
    }
}