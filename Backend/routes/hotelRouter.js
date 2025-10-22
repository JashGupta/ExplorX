import express from 'express';
import { registerHotel } from '../controllers/hotelController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const hotelRouter = express.Router();

hotelRouter.post('/register',authMiddleware, registerHotel);

export default hotelRouter;