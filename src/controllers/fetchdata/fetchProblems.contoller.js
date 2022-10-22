import todo from "../../models/todo.js"
import user from "../../models/user.js"

export const fetchProblems=async(req,res)=>{
    try {
        let {email}=req.body;

        const problemRecords=await todo.findOne({
            email
        })
        res.json(problemRecords);
        // console.log(problemRecords);

    } catch (error) {
        res.json(error)
    }
}