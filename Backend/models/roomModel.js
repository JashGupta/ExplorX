import mongoose from "mongoose";

export const roomSchema = new mongoose.Schema(
  {
    hotel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotel",
      required: true,
    },

    roomDescription: { type: String },
    bedType: { type: String },

    roomType: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },

    roomImages: [
      {
        url: { type: String, required: true },
        public_id: { type: String, required: true },
      }
    ],

    capacity: { type: Number, default: 1 },
    amenities: [String],

    active: { type: Boolean, default: true },
    bookings: [{ type: mongoose.Schema.Types.ObjectId, ref: "Booking" }],
  },
  { timestamps: true }
);

const Room = mongoose.model("Room", roomSchema);

export default Room;
