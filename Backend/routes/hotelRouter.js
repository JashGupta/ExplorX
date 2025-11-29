import express from 'express';
import { registerHotel } from '../controllers/hotelController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import upload from '../middlewares/uploadMiddleware.js';

const hotelRouter = express.Router();

hotelRouter.post('/register',authMiddleware, upload.array('images', 4), registerHotel);

export default hotelRouter;