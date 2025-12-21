import express from 'express';
import { editHotelDetails, getHotel, getHotels, getMyHotels, registerHotel } from '../controllers/hotelController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import upload from '../middlewares/uploadMiddleware.js';

const hotelRouter = express.Router();

hotelRouter.post('/register',authMiddleware, upload.array('hotelImages', 4), registerHotel);
hotelRouter.get('/get-hotels', getHotels);
hotelRouter.get('/get-my-hotels', authMiddleware, getMyHotels);
hotelRouter.get('/:id', getHotel);
hotelRouter.put('/edit/:id', authMiddleware, upload.array('hotelImages', 4), editHotelDetails);

export default hotelRouter;