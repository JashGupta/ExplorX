import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePic: { type: String, required: true },
    role: { type: String, enum: ["user", "hotelOwner"], default: "user" },
    recentSearchedCities: [{ type: String }],
    bookings: [{ type: mongoose.Schema.Types.ObjectId, ref: "Booking", default: [] }],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
