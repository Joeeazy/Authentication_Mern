import User from "../models/user.model.js"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
    try {
        const {name, email, password} = req.body;

        //check for neccessary inputs
        if(!name, !email, !password) {
            return res.status(400).json({success: false, message: "Missing credentials"})
        }
    
        const existingUser = await User.findOne({email});
        if(existingUser) {
            return res.status(400).json({success: false, message: "User Already exists"})
        }
    
        //hashpassword before storing user to db
        const hashedPassword = await bcrypt.hash(password, 10);

        //create the new user
        const user = await User.create({name, email, password: hashedPassword})
        //save to db
        await user.save();

        return res.status(200).json({success:true, message: "User Created successfully"})
    } catch (error) {
        res.status(400).json({success: false, message: error.message})
    }
}

export const login = async (req, res) => {
    try {
        //get user input
        const {email, password} = req.body;

        if(!email || !password){
            return res.status(404).json({success: false, message: "Enter Email and Password"})
        }

        //check if user is registered
        const user = await User.findOne({email});

        if (!user) {
            return res.status(404).json({success: false, message: "User does not exist"})
        }

        //compare password
        const comparePassword = await bcrypt.compare(password, user.password)

        if(!comparePassword){
            return res.status(404).json({success: false, message: "Wrong Password"})
        }

        return res.status(200).json({success:true, message: "Login successful"})

    } catch (error) {
        res.status(400).json({success: false, message: error.message})
    }
}

export const logout = async (req, res) => {
    res.send("logout route");
}