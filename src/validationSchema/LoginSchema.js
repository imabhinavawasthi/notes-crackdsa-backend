import { check } from "express-validator";

export const LoginSchema=[
    check('email','email is required').trim().isEmail().withMessage("email should be valid"),

]