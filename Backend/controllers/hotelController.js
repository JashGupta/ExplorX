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

    const existingHotel = await Hotel.findOne({ name, owner });
    if (existingHotel) {
      return res.status(400).json({
        success: false,
        message: "You already have a hotel with this name",
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
    const owner = req.user._id;
    const hotels = await Hotel.find({ owner })
      .populate("owner")
      .populate({
        path: "rooms",
        populate: {
          path: "bookings",
          populate: { path: "user" },
        },
      });

    res.json({ success: true, hotels });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const editHotelDetails = async (req, res) => {
  try {
    const { id: hotelId } = req.params;
    const owner = req.user._id;

    const hotel = await Hotel.findOne({ _id: hotelId, owner });
    if (!hotel) {
      return res
        .status(404)
        .json({ success: false, message: "Hotel not found" });
    }

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

    // ---------- STRING FIELDS ----------
    if (name !== undefined) {
      if (!isValidString(name) || name.trim().length < 3)
        return res.status(400).json({ message: "Invalid hotel name" });
      hotel.name = name;
    }

    if (address !== undefined) {
      if (!isValidString(address))
        return res.status(400).json({ message: "Invalid address" });
      hotel.address = address;
    }

    if (city !== undefined) {
      if (!isValidString(city))
        return res.status(400).json({ message: "Invalid city" });
      hotel.city = city;
    }

    if (description !== undefined) {
      if (!isValidString(description))
        return res.status(400).json({ message: "Invalid description" });
      hotel.description = description;
    }

    if (offer !== undefined) {
      if (!isValidString(offer))
        return res.status(400).json({ message: "Invalid offer" });
      hotel.offer = offer;
    }

    // ---------- CONTACT ----------
    if (contact !== undefined) {
      if (!/^\d{10}$/.test(contact))
        return res.status(400).json({ message: "Invalid contact number" });
      hotel.contact = contact;
    }

    // ---------- NUMBERS ----------
    if (startingPrice !== undefined) {
      const price = Number(startingPrice);
      if (isNaN(price) || price <= 0)
        return res.status(400).json({ message: "Invalid starting price" });
      hotel.startingPrice = price;
    }

    if (rating !== undefined) {
      const rate = Number(rating);
      if (isNaN(rate) || rate < 0 || rate > 5)
        return res.status(400).json({ message: "Invalid rating" });
      hotel.rating = rate;
    }

    if (reviews !== undefined) {
      const rev = Number(reviews);
      if (isNaN(rev) || rev < 0)
        return res.status(400).json({ message: "Invalid reviews" });
      hotel.reviews = rev;
    }

    // ---------- ARRAYS ----------
    if (amenities !== undefined) {
      if (
        !Array.isArray(amenities) ||
        amenities.some((a) => !isValidString(a))
      ) {
        return res.status(400).json({ message: "Invalid amenities" });
      }
      hotel.amenities = amenities;
    }

    if (policies !== undefined) {
      if (
        !Array.isArray(policies) ||
        policies.some((p) => !isValidString(p))
      ) {
        return res.status(400).json({ message: "Invalid policies" });
      }
      hotel.policies = policies;
    }

    // ---------- IMAGES ----------
    if (req.files && req.files.length > 0) {
      const uploadedImages = await Promise.all(
        req.files.map(async (file) => {
          const response = await cloudinary.uploader.upload(file.path, {
            folder: "hotel_images",
          });
          return {
            url: response.secure_url,
            public_id: response.public_id,
          };
        })
      );

      hotel.hotelImages.push(...uploadedImages);
    }

    await hotel.save();

    res.json({
      success: true,
      message: "Hotel details updated successfully",
      hotel,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Error editing hotel details" });
  }
};
