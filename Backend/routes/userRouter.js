import { Router } from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { getUserData, storeRecentSearchedCities } from '../controllers/userController.js';
import { loginUser, registerUser } from '../controllers/authController.js';
import upload from '../middlewares/uploadMiddleware.js';

const userRouter = new Router();

userRouter.get("/", authMiddleware, getUserData); 

userRouter.post("/register", upload.single("profilePic"), registerUser);
userRouter.post("/login", loginUser);

userRouter.post("/store-recent-search", authMiddleware, storeRecentSearchedCities)

export default userRouter;