import nodemailer from 'nodemailer'
import smtpTransport from 'nodemailer-smtp-transport'
import otpSend from "../../models/otpVerification.js"
import dotenv from 'dotenv'

dotenv.config();


let { EMAIL_AUTH, PASS_AUTH } = process.env;

//nodemailer
let transporter = nodemailer.createTransport(smtpTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: EMAIL_AUTH,
        pass: PASS_AUTH
    }
}))



const sendOtp = async (req, res) => {
    try {

        const { email,name } = req.body;
        
        await otpSend.deleteMany({email});
        
        const OTP = `${Math.floor(1000 + Math.random() * 9000)}`
        let mailOptions = {
            from: process.env.EMAIL_AUTH,
            to: `${email}`,
            subject: "crackDSA: Email Verification OTP",
            // text: `÷`
            html:'<html><div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2"><div style="margin:50px auto;width:70%;padding:20px 0"><div style="border-bottom:1px solid #eee"><a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">crackDSA.com</a></div><p style="font-size:1.1em">Hi, '+`${name}`+'</p><p>Thank you for choosing crackdsa. Use the following OTP to complete your registration.</p><h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">'+`${OTP}`+'</h2><p style="font-size:0.9em;">Regards,<br />crackDSA</p><hr style="border:none;border-top:1px solid #eee" /><div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300"><p>crackdsa.com</p><p>helloss@crackdsa.com</p><p>India</p></div></div></div></html>'
        }
        
        const newOTPsent=await new otpSend({
            email:email,
            otp:OTP,
            createdAt:Date.now(),
            expiresAt:Date.now()+600000
        })
        await newOTPsent.save();

        await transporter.sendMail(mailOptions,function  (err, data) {
            if (err) {
                // console.log(err);
                res.send(err);
            }
            else { 
                res.send({ "message": "otp sent", data })
            }
        })


    } catch (error) {
        res.send(error);
    }
}

export default sendOtp