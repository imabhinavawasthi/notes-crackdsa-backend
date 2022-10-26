import express from "express"
import checkUser from "../controllers/auth/checkUser.controller.js";
import forgotPassword from "../controllers/auth/forgotPassword.controller.js";
import Login from "../controllers/auth/Login.controller.js";
import Register from "../controllers/auth/Register.controller.js";
import sendOtp from "../controllers/auth/sendOtp.controller.js";
import verifyOtp from "../controllers/auth/verifyOtp.controller.js";
import { LoginSchema } from "../validationSchema/LoginSchema.js";
import { OTPSchema } from "../validationSchema/OTPSchema.js";
import { RegisterSchema } from "../validationSchema/RegisterSchema.js";

const authRoute=express.Router();

authRoute.post("/register",RegisterSchema,Register)
authRoute.post("/login",LoginSchema,Login)
authRoute.post("/otpsent",OTPSchema,sendOtp)
authRoute.post("/otpverify",OTPSchema,verifyOtp)
authRoute.post("/forgotpassword",OTPSchema,forgotPassword)
authRoute.post("/checkuser",checkUser); 

export default authRoute;