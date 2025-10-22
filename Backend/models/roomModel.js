import mongoose from "mongoose";

export const roomSchema = new mongoose.Schema(
  {
    hotel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotel",
      required: true,
    },
    roomType: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    images: [{ type: String }],
    amenities: [String],
    capacity: { type: Number, default: 1 },
    active: { type: Boolean, default: true },
    owner: { type: String, ref: "User" }, // Clerk id (optional)
    bookings: [{ type: mongoose.Schema.Types.ObjectId, ref: "Booking" }],
  },
  { timestamps: true }
);

const Room = mongoose.model("Room", roomSchema);

export default Room;
