import { validationResult } from "express-validator";
import user from "../../models/user.js";
import bcrypt from 'bcrypt'
import Jwt from 'jsonwebtoken'

const Login = async(req,res) => { 

    const error=validationResult(req);

    if(error.isEmpty()==false){
        res.send(error)
    }
    else{
        const {email,password}=req.body;

        const curruser=await user.findOne({email:email});

        if(!curruser){
            return res.json({status:"202",message:"user not exists"});
        }

        

        const verified=bcrypt.compareSync(password,curruser.password);

        if(!verified)
        {
            return res.json({status:"202",message:"wrong email or password"});
        }

        if(curruser.verified==false){
            return res.json({status:"202",message:"email not verified"});

        }

        const token=Jwt.sign({userId:curruser._id},process.env.JWT_TOKEN_SECRET);

        res.json({status:"201",message:"logged in",userId:curruser._id,token:token,name:curruser.name});
    }
 }

 export default Login;