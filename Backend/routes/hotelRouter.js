import express from 'express';
import { registerHotel } from '../controllers/hotelController.js';

const hotelRouter = express.Router();

hotelRouter.post('/register', registerHotel);

export default hotelRouter;