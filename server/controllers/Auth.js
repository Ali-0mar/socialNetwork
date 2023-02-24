import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import User from "../models/User.js";

/* Start Register A New User {*/
export const signUp = async(req, res) =>{
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation
        } = req.body;
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            picturePath,
            friends,
            location,
            occupation,
            viewedProfile: Math.floor(Math.random() * 10000),
            impressions: Math.floor(Math.random() * 10000)}
        );
        res.status(201).json(newUser)
    } catch (err) {
        res.status(500).json({error: err.message})
    }
};
/* } End Register A New User */

/* Start Signing In The User { */
export const signIn = async (req, res) =>{
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email: email});
        if(!user) {
            return res.status(400).json({message: "User not found"})
        }

        const isCredentialValid = await bcrypt.compare(password, user.password)
        if(!isCredentialValid) {
            return res.status(400).json({message: "Invalid email or password"})
        }
        const token = jwt.sign({id: user._id}, process.env.JWT_SECERET);
        delete user.password;
        res.status(200).json({token, user})
    } catch(err) {
        res.status(500).json({message: err.message})
    }
}
/* } End Signing In The User  */
