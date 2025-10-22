import express from 'express';
import { registerHotel } from '../controllers/hotelController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import upload from '../middlewares/uploadMiddleware.js';

const hotelRouter = express.Router();

hotelRouter.post('/register', upload.array('images', 4), authMiddleware, registerHotel);

export default hotelRouter;