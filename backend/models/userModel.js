import mongoose from "mongoose";

const userSchema =  new mongoose.Schema({
    userName:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    verifyOTP:{type:String,default:""},
    verifyOTPexpireAt:{type:Number,default:0},
    resetOTP:{type:String,default:""},
    resetOTPexpireAt:{type:Number,default:0},
    isVerified:{type:Boolean,default:false}

})

const userModel = mongoose.models.user || mongoose.model('user',userSchema);

export default userModel;