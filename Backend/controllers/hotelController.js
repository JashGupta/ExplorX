import { v2 as cloudinary } from "cloudinary";
import Hotel from "../models/hotelModel.js";
import User from "../models/userModel.js";

export const registerHotel = async (req, res) => {
  try {
    const owner = req.user._id;

    const hotel = await Hotel.findOne({ owner });
    if (hotel) {
      return res.json({ success: false, message: "Hotel already registered" });
    }

    const uploadImages = req.files.map(async (file) => {
      const response = await cloudinary.uploader.upload(file.path);
      return {
        url: response.secure_url,
        public_id: response.public_id,
      }
    });
    const images = await Promise.all(uploadImages);

    const hotelData = {
      ...req.body,
      images,
      owner,
      rooms: [],
      host: {
        name: req.user.username,
        profilePic: req.user.image || "",
      },
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
