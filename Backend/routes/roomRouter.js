import express from "express";
import upload from "../middlewares/uploadMiddleware.js";
import { addRoom, editRoomDetails, getRoom, toggleAvailability } from "../controllers/roomController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";


const roomRouter = express.Router();

roomRouter.post('/add-room', upload.array('roomImages', 4), authMiddleware, addRoom);
roomRouter.get('/:id', getRoom);
roomRouter.patch('/toggle-availability/:id', authMiddleware, toggleAvailability);
roomRouter.put('/edit/:id', upload.array('roomImages', 4), authMiddleware, editRoomDetails);

export default roomRouter;