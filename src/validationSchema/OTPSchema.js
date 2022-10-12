import { check } from "express-validator";

export const OTPSchema=[
    check('userID','userID is required').trim().isAlphanumeric().withMessage("not valid"),

]