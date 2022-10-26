import user from "../../models/user.js";

const checkUser = async (req, res) => {
    try {
        let { email} = req.body;

        const curruser = await user.findOne({ email });
        if (!curruser) {
            res.json({ message: "user not exists" })
        }
        else {
            res.json({ message: "user exists" })
        }

    } catch (error) {
        res.json({ error: error.message })
    }
}

export default checkUser