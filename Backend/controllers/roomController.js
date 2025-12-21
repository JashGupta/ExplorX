import Hotel from "../models/hotelModel.js";
import Room from "../models/roomModel.js";
import { v2 as cloudinary } from "cloudinary";

export const addRoom = async (req, res) => {
  try {
    const { hotel, roomType, price, roomDescription, capacity, active, bedType, amenities } = req.body;

    // Validate hotel
    const userHotel = await Hotel.findOne({ _id: hotel, owner: req.user._id });
    if (!userHotel) {
      return res.json({
        success: false,
        message: "Hotel not found or unauthorized",
      });
    }

    if (!roomType || !price) {
      return res.status(400).json({
        success: false,
        message:
          "Please provide all required fields:room type, and price",
      });
    }

    if (!amenities || !Array.isArray(amenities) || amenities.length < 3) {
      return res.status(400).json({
        success: false,
        message: "At least 3 amenities are required.",
      });
    }

    if (!price || Number(price) <= 0) {
      return res.status(400).json({
        success: false,
        message: "Price is required and must be greater than 0.",
      });
    }

    if (!req.files || req.files.length === 0) {
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
      hotel : userHotel._id,
      roomType,
      price,
      roomImages,
      roomDescription,
      capacity,
      active: active !== undefined ? active : true,
      bedType,
      amenities,
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
      return res
        .status(404)
        .json({ success: false, message: "Room not found" });
    }
    room.active = !room.active;
    await room.save();
    res.json({ success: true, message: "Room availability toggled", room });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Error in toggle availability" });
  }
};

export const editRoomDetails = async (req, res) => {
  try {
    const roomId = req.params.id;
    const room = await Room.findById(roomId).populate("hotel");

    if (!room) {
      return res.json({ success: false, message: "Room not found" });
    }

    // Check if the logged-in user is the owner of the hotel
    if (room.hotel.owner.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ success: false, message: "Unauthorized action" });
    }

    const {
      roomType,
      price,
      roomDescription,
      capacity,
      active,
      bedType,
      amenities,
    } = req.body;

    // Update fields if provided
    if (roomType) room.roomType = roomType;
    if (price) room.price = price;
    if (roomDescription) room.roomDescription = roomDescription;
    if (capacity) room.capacity = capacity;
    if (active !== undefined) room.active = active;
    if (bedType) room.bedType = bedType;
    if (amenities && Array.isArray(amenities) && amenities.length >= 3) {
      room.amenities = amenities;
    } else if (amenities) {
      return res.status(400).json({
        success: false,
        message: "At least 3 amenities are required.",
      });
    }

    // Handle new room images if provided
    if (req.files && req.files.length > 0) {
      // Delete existing images from Cloudinary
      const deletePromises = room.roomImages.map((img) =>
        cloudinary.uploader.destroy(img.public_id)
      );
      await Promise.all(deletePromises);

      // Upload new images
      const uploadRoomImages = req.files.map(async (file) => {
        const result = await cloudinary.uploader.upload(file.path);
        return {
          url: result.secure_url,
          public_id: result.public_id,
        };
      });

      room.roomImages = await Promise.all(uploadRoomImages);
    }

    await room.save();

    res.json({ success: true, message: "Room details updated", room });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error editing room details" });
  }
}