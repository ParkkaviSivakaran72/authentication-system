import express from "express";
import { isAuthenticated, login, logout, register, resetOTP, resetPassword, verificationOTP, verifyEmail } from "../controllers/userController.js";
import authUser from "../middleware/authUser.js";

const userRouter = express.Router();

userRouter.post('/register',register);
userRouter.post('/login',login);
userRouter.post('/logout',logout);
userRouter.post('/send-verify-otp',authUser,verificationOTP);
userRouter.post('/verify-email',verifyEmail);
userRouter.get('/is-authenticated',authUser,isAuthenticated);
userRouter.post('/send-reset-otp',resetOTP);
userRouter.post('/reset-password',resetPassword);


export default userRouter;