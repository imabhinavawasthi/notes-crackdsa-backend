import todo from "../../models/todo.js"
import user from "../../models/user.js"

export const createTodo=async(req,res)=>{
    try {
        let {title,description,isSolved,link,topic}=req.body;
        const result=await todo.create({
            userId:req.userId,
            title:title,
            description:description,
            isSolved:isSolved,
            link:link,
            topic:topic
        })

        if(result){
            console.log(req.userId);
            const curruser=await user.findOneAndUpdate({
                _id:req.userId
            },
            {
                $push:{todos:result}
            }
            )
            console.log(curruser);
            res.json({message:"todo created"})
        }

    } catch (error) {
        res.json(error)
    }
}