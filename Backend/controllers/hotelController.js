import { v2 as cloudinary } from "cloudinary";
import Hotel from "../models/hotelModel.js";
import User from "../models/userModel.js";
import Room from "../models/roomModel.js";

export const registerHotel = async (req, res) => {
  try {
    const owner = req.user._id;

    const uploadHotelImages = req.files.map(async (file) => {
      const response = await cloudinary.uploader.upload(file.path);
      return {
        url: response.secure_url,
        public_id: response.public_id,
      }
    });
    const hotelImages = await Promise.all(uploadHotelImages);

    const hotelData = {
      ...req.body,
      hotelImages,
      owner,
      rooms: [],
    };

    await Hotel.create(hotelData);
    await User.findByIdAndUpdate(owner, { role: "hotelOwner" });

    return res.json({
      success: true,
      message: "Hotel registered successfully",
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const getHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find();
    res.json({ success: true, hotels });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
}

export const getHotel = async(req, res) => {
  try {
    const hotelId = req.params.id;

    const hotel = await Hotel.findById(hotelId).populate("owner", "username profilePic");
    if(!hotel) {
      return res.json({ sucess: false, message: "Hotel not found" });
    }
    const rooms = await Room.find({ hotel: hotelId });

    res.json({ success: true, hotel, rooms });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
}

export const getMyHotels = async (req, res) => {
  try {
    const owner = req.user._id;

    const hotels = await Hotel.find({ owner: req.user._id });

    res.json({ success: true, hotels });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};