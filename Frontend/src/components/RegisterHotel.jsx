import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const RegisterHotel = () => {
  const { setShowHotelReg, setIsOwner, axios, token } = useAppContext();

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [city, setCity] = useState("");
  const [startingPrice, setStartingPrice] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState("");
  const [reviews, setReviews] = useState("");
  const [hotelImages, setHotelImages] = useState([]);
  const [amenities, setAmenities] = useState([]);
  const [policies, setPolicies] = useState("");
  const [offer, setOffer] = useState("");

  const amenitiesList = [
    "Free WiFi",
    "Parking",
    "Restaurant",
    "Room Service",
    "Daily Housekeeping",
    "Power Backup",
    "CCTV",
    "Lift",
    "Non-smoking Hotel",
  ];
  const handleAmenityChange = (amenity) => {
    setAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((a) => a !== amenity)
        : [...prev, amenity]
    );
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files).slice(0, 4);
    setHotelImages(files);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("contact", contact);
      formData.append("address", address);
      formData.append("description", description);
      formData.append("city", city);
      formData.append("startingPrice", startingPrice);
      formData.append("rating", rating);
      formData.append("reviews", reviews);
      formData.append("offer", offer);

      amenities.forEach((a) => formData.append("amenities[]", a));

      policies
        .split(",")
        .map((p) => p.trim())
        .filter(Boolean)
        .forEach((p) => formData.append("policies[]", p));

      hotelImages.forEach((img) => formData.append("hotelImages", img));

      const { data } = await axios.post("/api/hotels/register", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (data.success) {
        toast.success(data.message);
        setIsOwner(true);
        setShowHotelReg(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Error registering hotel: " + error.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm pt-20">
      <div className="relative w-full max-w-5xl bg-white/30 backdrop-blur-xl border border-white/30 rounded-2xl shadow-2xl p-6 md:p-8 text-white overflow-y-auto max-h-[85vh] animate-fadeIn">
        {/* Close Button */}
        <button
          onClick={() => setShowHotelReg(false)}
          className="absolute top-4 right-4 text-white hover:text-gray-300"
        >
          <IoClose size={26} />
        </button>

        {/* Heading */}
        <h2 className="text-3xl font-semibold text-center mb-2">
          Register Your Hotel
        </h2>
        <p className="text-center text-gray-200 mb-6 text-sm">
          Add your hotel details to reach thousands of travelers
        </p>

        <form
          onSubmit={submitHandler}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          {/* Hotel Name */}
          <div>
            <label className="text-sm mb-1 block">Hotel Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Hotel Name"
              className="w-full p-3 rounded-md bg-white/25 text-white placeholder-gray-200 border border-white/20 focus:ring-2 focus:ring-emerald-300 outline-none"
            />
          </div>

          {/* Contact */}
          <div>
            <label className="text-sm mb-1 block">Contact Number</label>
            <input
              type="tel"
              required
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder="Phone number"
              className="w-full p-3 rounded-md bg-white/25 text-white placeholder-gray-200 border border-white/20 focus:ring-2 focus:ring-emerald-300 outline-none"
            />
          </div>

          {/* City */}
          <div>
            <label className="text-sm mb-1 block">Select City</label>
            <select
              value={city}
              required
              onChange={(e) => setCity(e.target.value)}
              className="w-full p-3 rounded-md bg-white/25 text-white border border-white/20 focus:ring-2 focus:ring-emerald-300 outline-none"
            >
              <option value="">Choose City</option>
              <option value="Haryana">Haryana</option>
              <option value="New York">New York</option>
              <option value="Himachal">Himachal</option>
              <option value="Punjab">Punjab</option>
            </select>
          </div>

          {/* Starting Price */}
          <div>
            <label className="text-sm mb-1 block">Starting Price</label>
            <input
              type="text"
              value={startingPrice}
              onChange={(e) => setStartingPrice(e.target.value)}
              placeholder="₹0"
              className="w-full p-3 rounded-md bg-white/25 text-white placeholder-gray-200 border border-white/20 focus:ring-2 focus:ring-emerald-300 outline-none"
            />
          </div>

          {/* Rating */}
          <div>
            <label className="text-sm mb-1 block">Rating (0-5)</label>
            <input
              type="number"
              min="0"
              max="5"
              step="0.1"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              placeholder="4.5"
              className="w-full p-3 rounded-md bg-white/25 text-white placeholder-gray-200 border border-white/20 focus:ring-2 focus:ring-emerald-300 outline-none"
            />
          </div>

          {/* Reviews */}
          <div>
            <label className="text-sm mb-1 block">Reviews</label>
            <input
              type="number"
              value={reviews}
              onChange={(e) => setReviews(e.target.value)}
              placeholder="120"
              className="w-full p-3 rounded-md bg-white/25 text-white placeholder-gray-200 border border-white/20 focus:ring-2 focus:ring-emerald-300 outline-none"
            />
          </div>

          {/* Address - full width */}
          <div className="sm:col-span-2">
            <label className="text-sm mb-1 block">Hotel Address</label>
            <textarea
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Complete address"
              className="w-full p-3 rounded-md bg-white/25 text-white placeholder-gray-300 border border-white/20 focus:ring-2 focus:ring-emerald-300 outline-none"
            />
          </div>

          {/* Description */}
          <div className="sm:col-span-2">
            <label className="text-sm mb-1 block">Description</label>
            <textarea
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your hotel and services"
              className="w-full p-3 rounded-md bg-white/25 text-white placeholder-gray-300 border border-white/20 focus:ring-2 focus:ring-emerald-300 outline-none"
            />
          </div>

          {/* Images */}
          <div className="sm:col-span-2">
            <label className="text-sm mb-1 block">Upload Images (max 4)</label>
            <input
              type="file"
              multiple
              onChange={handleImageChange}
              className="w-full p-3 rounded-md bg-white/25 text-white border border-white/20 focus:ring-2 focus:ring-emerald-300 outline-none"
            />
          </div>

          {/* Amenities */}
          <div className="sm:col-span-2">
            <label className="text-sm mb-2 block">Amenities</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {amenitiesList.map((amenity, idx) => (
                <label key={idx} className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={amenities.includes(amenity)}
                    onChange={() => handleAmenityChange(amenity)}
                  />
                  {amenity}
                </label>
              ))}
            </div>
          </div>

          {/* Policies */}
          <div className="sm:col-span-2">
            <label className="text-sm mb-1 block">
              Policies (comma separated)
            </label>
            <textarea
              value={policies}
              onChange={(e) => setPolicies(e.target.value)}
              placeholder="No smoking, Check-in after 2PM"
              className="w-full p-3 rounded-md bg-white/25 text-white placeholder-gray-300 border border-white/20 focus:ring-2 focus:ring-emerald-300 outline-none"
            />
          </div>

          {/* Offer */}
          <div className="sm:col-span-2">
            <label className="text-sm mb-1 block">Offer</label>
            <input
              type="text"
              value={offer}
              onChange={(e) => setOffer(e.target.value)}
              placeholder="20% off"
              className="w-full p-3 rounded-md bg-white/25 text-white placeholder-gray-300 border border-white/20 focus:ring-2 focus:ring-emerald-300 outline-none"
            />
          </div>

          {/* Submit Button */}
          <div className="sm:col-span-2 pt-2">
            <button
              type="submit"
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg transition-all shadow-lg"
            >
              Register Hotel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterHotel;
