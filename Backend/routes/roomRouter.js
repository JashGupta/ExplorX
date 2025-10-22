import express from "express";
import upload from "../middlewares/uploadMiddleware.js";
import { createRoom, getOwnerRooms, getRooms, toggleRoomAvailability } from "../controllers/roomController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";


const roomRouter = express.Router();

roomRouter.post('/', upload.array('images', 4), authMiddleware, createRoom)
roomRouter.get('/', getRooms);
roomRouter.get('/owner', authMiddleware, getOwnerRooms);
roomRouter.post('/toggle-availability', toggleRoomAvailability);

export default roomRouter;