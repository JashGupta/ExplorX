import { Router } from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { getUserData, storeRecentSearchedCities, registerUser, loginUser, editUserDetails } from '../controllers/userController.js';
import upload from '../middlewares/uploadMiddleware.js';

const userRouter = new Router();

userRouter.get("/", authMiddleware, getUserData); 

userRouter.post("/register", upload.single("profilePic"), registerUser);
userRouter.post("/login", loginUser);
userRouter.put("/edit", authMiddleware, upload.single("profilePic"), editUserDetails);

userRouter.post("/store-recent-search", authMiddleware, storeRecentSearchedCities)

export default userRouter;