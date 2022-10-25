import todo from "../../models/todo.js"
import user from "../../models/user.js"

export const fetchProblemData=async(req,res)=>{
    try {
        let {_id}=req.body;

        const problemDetails=await todo.findOne({
            _id
        })
        res.json(problemDetails);

    } catch (error) {
        res.json(error)
    }
}