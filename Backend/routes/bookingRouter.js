import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { createBooking } from "../controllers/bookingController.js";

const bookingRouter = express.Router();

bookingRouter.post("/create-booking", authMiddleware, createBooking);

export default bookingRouter;