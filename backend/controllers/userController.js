import userModel from "../models/userModel.js";

export const register = async(req,res) => {
    const {userName, email, password} = req.body;

    if(!userName || !email ||!password){
        return res.json({success:false,message:"Enter all details properly."});
    }
    try {
        const existingUser = await userModel.findOne({email});
        if(existingUser){
            return res.json({success:false,message:"Email already exists"});
        }
        const hashedPassword = await bcrypt.hash(password,10)
        const user = new userModel({userName, email, password:hashedPassword});
        user.save();
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET, {expiresIn:'7d'})
        res.cookie('token',token,{
            httpOnly:true,
            secure:process.env.NODE_ENV === 'production',
            sameSite:process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge:7 * 24 * 3600 * 1000
        })
    } catch (error) {
        return res.json({success:false,message:error.message})
        
    }
}