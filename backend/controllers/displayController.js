import userModel from "../models/userModel.js";

export const getUserData = async (req, res) => {
    try {
        // Get the userId from the authenticated request object
        // const { userName } = req.body;

        // Find the user by ID, excluding the password field
        const user = await userModel.findById(req.body.userId);
        // console.log(req.body.userId)

        // Check if the user was found
        if (!user) {
            return res.json({ success: false, message: "User not found!" });
        }

        // Return the user data
        return res.json({
            success: true,
            user
        });
    } catch (error) {
        console.log("Error fetching user data:", error.message);
        return res.json({ success: false, message: error.message });
    }
};
