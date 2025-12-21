import express from "express";
import upload from "../middlewares/uploadMiddleware.js";
import { addRoom, getRoom, toggleAvailability } from "../controllers/roomController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";


const roomRouter = express.Router();

roomRouter.post('/add-room', upload.array('roomImages', 4), authMiddleware, addRoom);
roomRouter.get('/:id', getRoom);
roomRouter.patch('/toggle-availability/:id', authMiddleware, toggleAvailability);

export default roomRouter;