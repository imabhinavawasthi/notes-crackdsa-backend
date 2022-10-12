import otpSend from "../../models/otpVerification.js"
import user from "../../models/user.js";
import bcrypt from 'bcrypt'


const forgotPassword = async (req, res) => {
    try {
        let { email, new_password } = req.body;

        const curruser = await user.findOne({ email });
        if (!curruser) {
            res.json({ message: "user not exists" })
        }
        else {
            const salt = await bcrypt.genSalt(10);
            const hashNewPassword = await bcrypt.hash(new_password, salt);
            await user.updateOne({ email: email }, { password: hashNewPassword });
            res.json({ message: "password changed" })
        }

    } catch (error) {
        res.json({ error: error.message })
    }
}

export default forgotPassword