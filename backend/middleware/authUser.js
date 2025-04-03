import jwt from "jsonwebtoken";

const authUser = async(req,res,next) => {
    const {token} = req.cookies;
    
    if(!token){
        return res.json({success:false,message:"No authorized. Please login again!"})
    }
    try {
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET)
        
        if(tokenDecode.id){
            req.body = {userId:tokenDecode.id};
        }
        else{
            return res.json({success:false,message:"No authorized. Please login again!"})
        }
        next();
    } catch (error) {
        console.log(error)
        return res.json({success:false,message:error.message})
    }
}

export default authUser;