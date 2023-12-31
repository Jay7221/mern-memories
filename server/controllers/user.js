import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

export const signin = async (req, res) => {
    const { email, password } = req.body;

    try{
        const existingUser = await User.findOne({ email });
        if(!existingUser){
            return res.status(404).json({ success: false, message: "User doesn't exist." });
        }
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        
        if(!isPasswordCorrect){
            return res.status(400).json({ success: false, message: "Invalid credentials." });
        }

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, 'secret_string', { expiresIn: "1h" });
        res.status(200).json({ result: existingUser, token });
    }
    catch(error){
        res.status(500).json({ success: false, message: "Something went wrong." });
    }
};
export const signup = async (req, res) => {
    const { email, password, firstName, lastName, confirmPassword } = req.body;

    try{
        const existingUser = await User.findOne({ email });
        if(existingUser){
            return res.status(400).json({ success: false, message: "User already exists." });
        }
        if(password !== confirmPassword){
            return res.status(400).json({ success: false, message: "Password and confirm password don't match." });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` });

        const token = jwt.sign({ email: result.email, id: result._id }, 'secret_string', { expiresIn: "1h" });
        res.status(200).json({ result, token });
    }
    catch(error){
        console.log(error);
        res.status(500).json({ success: false, message: "Something went wrong." });
    }
};