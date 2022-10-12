import { check } from "express-validator";

export const RegisterSchema=[
    check('name','name is required').trim().isAlpha().withMessage("name should be alpha"),

]