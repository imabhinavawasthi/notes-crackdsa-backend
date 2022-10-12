import todo from "../../models/todo.js";

export const markTodo=async(req,res)=>{
    try {
        const todof=await todo.findOneAndUpdate({
            _id:req.body.todo_id,
            userId:req.userId

        },[
            {
                $set:{
                    isSolved:{
                        $eq:[false,"$isSolved"]
                    }
                }
            }
        ])
        if(todof){
            res.json({message:"updated"})
        }
        else{
            req.json({message:"no todo"})
        }
    } catch (error) {
        res.json(error);
    }
}