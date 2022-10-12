import otpSend from "../../models/otpVerification.js"
import user from "../../models/user.js";


const verifyOtp = async (req, res) => {
    try {
        let {email,OTP}=req.body;
        const otpVerificationRecords=await otpSend.findOne({
            email
        })
        if(!otpVerificationRecords){
            res.json({message:"no otp record"});
        }
        else{
            // res.send(otpVerificationRecords)
            const recordOTP=otpVerificationRecords.otp;
            if(recordOTP==OTP){
                await user.updateOne({email:email},{verified:true});
                await otpSend.deleteMany({email});
                res.json({message:"otp verified"});
            }
            else{
                res.json({message:"wrong otp"});
            }
        }
    } catch (error) {
        res.json({message:error.message})
    }
}

export default verifyOtp