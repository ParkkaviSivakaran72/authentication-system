import userModel from "../models/userModel.js";

export const getUserData = async (req, res) => {
    try {
        // Get the userId from the authenticated request object
        const { userId } = req.user;

        // Find the user by ID, excluding the password field
        const user = await userModel.findById(userId).select("-password");

        // Check if the user was found
        if (!user) {
            return res.json({ success: false, message: "User not found!" });
        }

        // Return the user data
        return res.json({
            success: true,
            userData: {
                userName: user.userName,
                isVerified: user.isVerified,
            },
        });
    } catch (error) {
        console.log("Error fetching user data:", error.message);
        return res.json({ success: false, message: error.message });
    }
};
