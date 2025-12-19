import { v2 as cloudinary } from "cloudinary";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const validateEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const validatePassword = (password) => {
  return /^(?=.*[A-Za-z])(?=.*\d).{6,}$/.test(password);
};

export const registerUser = async (req, res) => {
  try {
    const { email, password, username } = req.body;

    if (!email || !password || !username)
      return res.status(400).json({
        success: false,
        message: "All fields (username, email, password) are required",
      });

    if (!validateEmail(email))
      return res
        .status(400)
        .json({ success: false, message: "Invalid email format" });

    if (!validatePassword(password))
      return res.status(400).json({
        success: false,
        message:
          "Password must be 6+ characters and include letters & numbers.",
      });

    if (!req.file)
      return res
        .status(400)
        .json({ success: false, message: "Profile image is required" });

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res
        .status(400)
        .json({ success: false, message: "Email already registered" });

    let imageUrl;
    try {
      const uploaded = await cloudinary.uploader.upload(req.file.path, {
        folder: "profile_pics",
      });
      imageUrl = uploaded.secure_url;
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Image upload failed",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      profilePic: imageUrl,
    });

    const token = jwt.sign(
      { id: newUser._id, email: newUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      success: true,
      message: "Registration successful",
      token,
      user: newUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res
        .status(400)
        .json({ success: false, message: "Email & password are required" });

    if (!validateEmail(email))
      return res
        .status(400)
        .json({ success: false, message: "Invalid email format" });

    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res
        .status(400)
        .json({ success: false, message: "Invalid or Wrong password" });

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      success: true,
      message: "Login successful",
      token,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};
