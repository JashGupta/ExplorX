import { Router } from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { getUserData, storeRecentSearchedCities } from '../controllers/userController.js';

const userRouter = new Router();

userRouter.get("/", authMiddleware, getUserData); 
userRouter.post("/store-recent-search", authMiddleware, storeRecentSearchedCities)

export default userRouter