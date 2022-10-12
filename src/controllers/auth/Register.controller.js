import { validationResult } from "express-validator";
import bcrypt from 'bcrypt'
import user from "../../models/user.js";
import {JWT_TOKEN_SECRET} from "../../utils/constants.js"
import Jwt from 'jsonwebtoken'

  const Register = async(req,res) => { 

    const error=validationResult(req)

    if(error.isEmpty()){
        const {name,password,email,college}=req.body;
        const salt=await bcrypt.genSalt(10);
        const hashPassword=await bcrypt.hash(password,salt);
        // password=hashPassword;

        //save to db

        const userExists=await user.findOne({
            $or:[{
                email:email
            }]
        })  
        
        if(userExists){
            res.json({"message":"user already exists"});
            return;
        }


        try {
            const result=await user.create({
                name:name,
                password:hashPassword, 
                email:email,
                college:college,
                verified:false
            })

            const token=Jwt.sign({userId:result._id},JWT_TOKEN_SECRET);

            res.json({status:"201",message:"user registered",result,"userId":result._id,"token":token});
        } catch (error) {
            console.log(error);
        }


    }
    else 
    res.send(error);
 }

 export default Register;