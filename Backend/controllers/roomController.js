import Hotel from "../models/hotelModel.js";
import Room from "../models/roomModel.js";
import { v2 as cloudinary } from "cloudinary";

export const addRoom = async (req, res) => {
  try {
    const { hotel } = req.body;

    // Validate hotel
    const userHotel = await Hotel.findOne({ _id: hotel, owner: req.user._id });
    if (!userHotel) {
      return res.json({ success: false, message: "Hotel not found or unauthorized" });
    }

    // Upload images (max 4)
    const uploadRoomImages = req.files.map(async (file) => {
      const result = await cloudinary.uploader.upload(file.path);

      return {
        url: result.secure_url,
        public_id: result.public_id,
      };
    });

    const roomImages = await Promise.all(uploadRoomImages);

    // Create room
    const newRoom = await Room.create({
      ...req.body,
      roomImages,
    });

    // Add room to hotel.rooms[]
    userHotel.rooms.push(newRoom._id);
    await userHotel.save();

    return res.json({
      success: true,
      message: "Room created successfully",
      room: newRoom,
    });

  } catch (error) {
    console.error("Create Room Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};