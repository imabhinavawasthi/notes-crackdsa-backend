import Jwt from "jsonwebtoken";
import dotenv from 'dotenv'

dotenv.config();

const userMiddleware=(req,res,next)=>{
    if(req.headers['auth']===undefined){
        return res.json({message:"access denied"});
    }
    else{
        const token=req.headers['auth'];
        try {
            const decoded=Jwt.verify(token,process.env.JWT_TOKEN_SECRET);
            req.userId=decoded.userId;
            return next();
        } catch (error) {
            res.json(error);
        }
    }
}

export default userMiddleware;