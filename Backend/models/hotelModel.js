import mongoose from "mongoose";

const hotelSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    contact: { type: String, required: true },
    city: { type: String, required: true, index: true },
    startingPrice: { type: Number, required: false },
    rating: { type: Number, min: 0, max: 5, default: 0 },
    reviews: { type: Number, default: 0 },
    images: [String],
    amenities: [String],
    policies: [String],
    offer: { type: String },
    owner: { type: String, ref: "User" },
    rooms: { type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Room" }], default: [] },
    host: {
      name: String,
      profilePic: String,
    },
  },
  { timestamps: true }
);

const Hotel = mongoose.model("Hotel", hotelSchema);

export default Hotel;
