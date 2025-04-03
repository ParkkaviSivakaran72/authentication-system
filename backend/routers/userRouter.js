import express from "express";
import { login, logout, register, verificationOTP, verifyEmail } from "../controllers/userController.js";
import authUser from "../middleware/authUser.js";

const userRouter = express.Router();

userRouter.post('/register',register);
userRouter.post('/login',login);
userRouter.post('/logout',logout);
userRouter.post('/send-verify-otp',authUser,verificationOTP);
userRouter.post('/verify-email',authUser,verifyEmail);

export default userRouter;