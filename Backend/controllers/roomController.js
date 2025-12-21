import Hotel from "../models/hotelModel.js";
import Room from "../models/roomModel.js";
import { v2 as cloudinary } from "cloudinary";

export const addRoom = async (req, res) => {
  try {
    const { hotel, roomtype, price } = req.body;

    // Validate hotel
    const userHotel = await Hotel.findOne({ _id: hotel, owner: req.user._id });
    if (!userHotel) {
      return res.json({
        success: false,
        message: "Hotel not found or unauthorized",
      });
    }

    if(!roomtype, hotel, price){
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields: hotel, room type, atleast one room image, and price",
      });
    }

    if (price <= 0) {
      return res
        .status(400)
        .json({ success: false, message: "Price must be a positive number" });
    }

    if(!req.files || req.files.length === 0){
      return res.status(400).json({
        success: false,
        message: "At least one room image is required",
      });
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

export const getRoom = async (req, res) => {
  try {
    const roomId = req.params.id;

    const room = await Room.findById(roomId)
      .populate({
        path: "bookings",
        select: "checkIn checkOut -_id",
      })
      .populate({
        path: "hotel",
        select:
          "name address city contact rating reviews amenities policies offer hotelImages owner",
        populate: {
          path: "owner",
          select: "username email profilePic role",
        },
      });

    if (!room) {
      return res.json({ success: false, message: "Room not found" });
    }

    return res.json({ success: true, room });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const toggleAvailability = async (req, res) => {
  try {
    const roomId = req.params.id;
    
    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ success: false, message: "Room not found" });
    }
    room.active = !room.active;
    await room.save();
    res.json({ success: true, message: "Room availability toggled", room });

  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error in toggle availability" });
  }
}