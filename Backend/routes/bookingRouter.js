import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { createBooking, getMyBookings } from "../controllers/bookingController.js";

const bookingRouter = express.Router();

bookingRouter.post("/create-booking", authMiddleware, createBooking);
bookingRouter.get("/get-my-bookings", authMiddleware, getMyBookings);

export default bookingRouter;