import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
    try {
        // Check for token in cookies first
        let token = req.cookies.token;
        
        // If no token in cookies, check the Authorization header
        if (!token) {
            const authHeader = req.headers.authorization;
            if (authHeader && authHeader.startsWith("Bearer ")) {
                token = authHeader.split(" ")[1];
            }
        }

        // If still no token, send an error response
        if (!token) {
            return res.json({ success: false, message: "Not authorized, please log in again" });
        }

        // Verify the token
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

        // Check if the token contains the user ID
        if (tokenDecode && tokenDecode.userId) {
            req.user = { userId: tokenDecode.userId };
            next();
        } else {
            return res.json({ success: false, message: "Invalid token, please log in again" });
        }
    } catch (error) {
        console.log("Authentication error:", error.message);

        // Handle specific JWT errors
        if (error.name === "TokenExpiredError") {
            return res.json({ success: false, message: "Session expired, please log in again" });
        } else if (error.name === "JsonWebTokenError") {
            return res.json({ success: false, message: "Invalid token, please log in again" });
        } else {
            return res.json({ success: false, message: "Authentication failed" });
        }
    }
};

export default authUser;
