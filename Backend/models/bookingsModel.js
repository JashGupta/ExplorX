import mongoose from "mongoose";

export const bookingSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    hotel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotel",
      required: true,
    },
    room: { type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
      required: true
    },

    snapshot: {
      hotelName: String,
      roomType: String,
      image: String,
      location: String,
      price: Number,
    },

    guests: { type: Number, default: 1 },

    amount: { type: Number, required: true },

    checkIn: { type: Date, required: true },
    checkOut: { type: Date, required: true },

    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Cancelled", "Paid", "Unpaid"],
      default: "Pending",
    },
    
    payment: {
      provider: String,
      transactionId: String,
      status: String,
    },
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
