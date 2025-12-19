import { v2 as cloudinary } from "cloudinary";
import Hotel from "../models/hotelModel.js";
import User from "../models/userModel.js";
import Room from "../models/roomModel.js";

const isValidString = (str) => typeof str === "string" && str.trim().length > 0;

export const registerHotel = async (req, res) => {
  try {
    const owner = req.user._id;

    const {
      name,
      address,
      contact,
      city,
      startingPrice,
      description,
      rating,
      reviews,
      amenities,
      policies,
      offer,
    } = req.body;

    if (!name || !address || !contact || !city) {
      return res.json({
        success: false,
        message: "Name, address, contact, and city are required.",
      });
    }

    if (contact.length < 10) {
      return res.status(400).json({
        success: false,
        message: "Contact number must be at least 10 digits.",
      });
    }

    if (!startingPrice || Number(startingPrice) <= 0) {
      return res.status(400).json({
        success: false,
        message: "Starting price is required and must be greater than 0.",
      });
    }

    if (!req.files || req.files.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "Hotel images are required." });
    }

    if (!amenities || !Array.isArray(amenities) || amenities.length < 3) {
      return res.status(400).json({
        success: false,
        message: "At least 3 amenities are required.",
      });
    }

    if (!policies || !Array.isArray(policies) || policies.length < 3) {
      return res.status(400).json({
        success: false,
        message: "At least 3 policies are required.",
      });
    }

    const uploadHotelImages = req.files.map(async (file) => {
      const response = await cloudinary.uploader.upload(file.path, {
        folder: "hotel_images",
      });
      return {
        url: response.secure_url,
        public_id: response.public_id,
      };
    });
    const hotelImages = await Promise.all(uploadHotelImages);

    const hotelData = {
      name,
      address,
      contact,
      city,
      startingPrice,
      description,
      rating: rating ? Number(rating) : 0,
      reviews: reviews ? Number(reviews) : 0,
      amenities,
      policies,
      offer,
      hotelImages,
      owner,
      rooms: [],
    };

    await Hotel.create(hotelData);
    await User.findByIdAndUpdate(owner, { role: "hotelOwner" });

    return res.json({
      success: true,
      message: "Hotel registered successfully",
      hotel: hotelData,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};

export const getHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find();
    res.json({ success: true, hotels });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getHotel = async (req, res) => {
  try {
    const hotelId = req.params.id;

    const hotel = await Hotel.findById(hotelId).populate(
      "owner",
      "username profilePic"
    );
    if (!hotel) {
      return res.json({ sucess: false, message: "Hotel not found" });
    }
    const rooms = await Room.find({ hotel: hotelId });

    res.json({ success: true, hotel, rooms });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getMyHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find({ owner });

    res.json({ success: true, hotels });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};
