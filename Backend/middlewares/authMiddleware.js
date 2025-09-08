import User from "../models/userModel.js";

export const authMiddleware = (req, res, next) => {
    const {userId} = req.auth;
    if(!userId) {
        res.json({sucess: false, message: "Not authenticated"});
    } else {
        const user = User.findById(userId);
        req.user = user;
        next();
    }
}