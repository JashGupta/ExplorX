import mongoose from "mongoose";

export const bookingSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    hotel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotel",
      required: true,
    },
    room: { type: mongoose.Schema.Types.ObjectId, ref: "Room", required: true },

    snapshot: {
      hotelName: { type: String, required: true },
      roomType: { type: String, required: true },
      image: { type: String, required: true },
      location: { type: String, required: true },
      price: { type: Number, required: true },
    },

    guests: { type: Number, default: 1 },

    amount: { type: Number, required: true },

    checkIn: { type: Date, required: true },
    checkOut: { type: Date, required: true },

    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Cancelled", "Completed"],
      default: "Pending",
    },

    payment: {
      provider: { type: String },
      transactionId: { type: String },
      status: {
        type: String,
        enum: ["Unpaid", "Paid", "Refunded", "Failed"],
        default: "Unpaid",
      },
    },
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
