import userModel from "../models/userModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import transporter from "../config/nodemailer.js";


export const register = async (req, res) => {
    const { userName, email, password } = req.body;

    if (!userName || !email || !password) {
        return res.json({ success: false, message: "Enter all details properly." });
    }
    try {
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.json({ success: false, message: "Email already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = new userModel({ userName, email, password: hashedPassword });
        user.save();
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' })
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 3600 * 1000
        })
        const mailOptions = {
            from:process.env.SENDER_EMAIL,
            to:email,
            subject:"welcome to our website !!",
            text:"You registered successfully. You can get more knowledge from our website.Do you want to clarify any clarification? Contact us!"
        }
        await transporter.sendMail(mailOptions);
         
        return res.json({success:true,messgae:"Registered successfully!"})
    } catch (error) {
        return res.json({ success: false, message: error.message })

    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.json({ success: false, message: "email and passweords are required!" });
    }
    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "Email is Invalid!" });
        }
        const isMatch = bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ success: false, message: "Password is Invalid!" });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 3600 * 1000
        });
        return res.json({success:true,message:"Login successfully!"});

    } catch (error) {
        return res.json({success:false,message:error.message});
    }
}

export const logout = async (req,res) => {
    try {
        res.clearCookie('token',{
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict'
        });
        return res.json({success:true,message:"Logout successfully!"});
    } catch (error) {
        return res.json({success:false,message:error.message});
    }
}

export const verificationOTP = async (req,res) => {
    try {
        const {userId} = req.body;
    const user = await userModel.findById(userId);
    if(user.isVerified){
        return res.json({success:false,message:"Your account is already verified."})
    }
    const otp = Math.floor(100000+Math.random()*900000)
    user.verifyOTP=(String)(otp);
    user.verifyOTPexpiresAt = Date.now() + 24 * 3600 * 1000;
    user.save();

    const mailOption = {
        from:process.env.SENDER_EMAIL,
        to:user.email,
        subject:"Your verification OTP here!",
        text:`Successfully get your verification OTP.your OTP is ${otp} `
    }
    await transporter.sendMail(mailOption);
    return res.json({success:true,message:"Verification sent successfully!"})
    } catch (error) {
        console.log(error)
        return res.json({success:false,message:error})
    }
}

export const verifyEmail = async (req,res) => {
    const {userId,otp} = req.body;
    console.log(otp)
    if(!userId || !otp){
        return res.json({success:false,message:"userId or otp does not exist"})
    }
    try {
        const user = await userModel.findById(userId);
        if(!user){
            return res.json({success:false,message:"User not found!"})
        }
        if(user.verifyOTP==='' || user.verifyOTP !== otp){
            return res.json({success:false,message:"OTP is Invalid!"})
        }
        if(verifyOTPexpiresAt < Date.now()){
            return res.json({success:false,message:"OTP is expired!"})
        }
        user.isVerified = true;
        user.verifyOTP = "";
        user.verifyOTPexpiresAt = 0;
        await user.save();
        return res.json({success:true,message:"Email verification successfully!"})
    } catch (error) {
        console.log(error)
        return res.json({success:false,message:error.message})
        
    }
}