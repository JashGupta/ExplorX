import mongoose from "mongoose";

const hotelSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    contact: { type: String, required: true },
    city: { type: String, required: true, index: true },

    startingPrice: { type: Number, required: false },

    description: { type: String },

    rating: { type: Number, min: 0, max: 5, default: 0 },
    reviews: { type: Number, default: 0 },

      hotelImages: [
      {
        url: { type: String, required: true },
        public_id: { type: String, required: true },
      },
    ],
    amenities: [String],
    policies: [String],
    offer: { type: String },

    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    rooms: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room",
        default: [],
      },
    ],
  },
  { timestamps: true }
);

const Hotel = mongoose.model("Hotel", hotelSchema);

export default Hotel;
