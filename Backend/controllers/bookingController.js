import Booking from "../models/bookingsModel.js";
import Room from "../models/roomModel.js";
import Hotel from "../models/hotelModel.js";

export const createBooking = async (req, res) => {
  try {
    const {
      room: roomId,
      hotel: hotelId,
      checkIn,
      checkOut,
      amount,
      guests,
    } = req.body;
    const userId = req.user._id;

    const room = await Room.findById(roomId).populate("hotel");
    if (!room) return res.status(404).json({ message: "Room not found" });

    const hotel = await Hotel.findById(hotelId);
    if (!hotel) return res.status(404).json({ message: "Hotel not found" });

    if (!roomId || !hotelId || !checkIn || !checkOut || !amount) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (guests > room.capacity) {
      return res
        .status(400)
        .json({ message: `Max capacity is ${room.capacity} guests` });
    }

    const existing = await Booking.findOne({
      room: roomId,
      checkIn: { $lt: checkOut },
      checkOut: { $gt: checkIn },
    });

    if (existing) {
      return res
        .status(400)
        .json({ message: "Room is not available on these dates" });
    }

    const snapshot = {
      hotelName: hotel.name,
      roomType: room.roomType,
      image: room.roomImages?.[0]?.url,
      location: hotel.city,
      price: room.price,
    };

    const booking = await Booking.create({
      user: userId,
      hotel: hotelId,
      room: roomId,
      snapshot,
      guests,
      amount,
      checkIn,
      checkOut,
      status: "Pending",
      payment: { status: "Unpaid" },
    });

    room.bookings.push(booking._id);
    await room.save();

    res.status(201).json({ message: "Booking created successfully", booking });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getMyBookings = async (req, res) => {
  try {
    const user = req.user._id;
    const bookings = await Booking.find({ user }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      bookings,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
};
