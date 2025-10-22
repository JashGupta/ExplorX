import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const RegisterHotel = () => {
  const { setShowHotelReg, setIsOwner, axios, getToken } = useAppContext();

  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [startingPrice, setStartingPrice] = useState("");
  const [rating, setRating] = useState("");
  const [reviews, setReviews] = useState("");
  const [images, setImages] = useState([]);
  const [amenities, setAmenities] = useState([]);
  const [policies, setPolicies] = useState("");
  const [offer, setOffer] = useState("");

  const amenitiesList = [
    "WiFi",
    "Air Conditioning",
    "TV",
    "Parking",
    "Breakfast",
    "Swimming Pool",
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
    setImages(files);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {

      const hotelData = {
        name,
        contact,
        address,
        city,
        startingPrice,
        rating,
        reviews,
        offer,
        amenities,
        policies: policies
          .split(",")
          .map((p) => p.trim())
          .filter(Boolean),
        images, // array of URLs
      };

      const { data } = await axios.post("/api/hotels/register", hotelData, {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
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
    <div className="fixed inset-0 z-50 flex items-center md:items-center justify-center bg-black/30 backdrop-blur-sm  w-full h-full">
      <div className="relative bg-white w-full max-w-6xl md:h-5/6 md:mt-10 md:rounded-lg shadow-lg overflow-hidden md:flex mt-20 text-emerald-950">
        {/* Close button */}
        <button
          className="absolute top-4 right-4 text-emerald-950 hover:text-black z-20"
          onClick={() => setShowHotelReg(false)}
        >
          <IoClose size={24} />
        </button>

        {/* Left Image */}
        <div className="w-full md:w-2/5 h-48 md:h-auto hidden md:block">
          <img
            src="/hotel-3.jpg"
            alt="Hotel"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Form */}
        <div className="w-full md:w-3/5 p-4 md:p-6 overflow-y-auto max-h-194">
          <h2 className="text-2xl font-bold text-center mb-2">
            Register Your Hotel
          </h2>
          <p className="text-center text-emerald-900 mb-6">
            Add your hotel and reach thousands of travelers
          </p>

          <form
            className="grid grid-cols-1 gap-4 sm:grid-cols-2"
            onSubmit={submitHandler}
          >
            {/* Hotel Name */}
            <div className="flex flex-col">
              <label className="text-sm font-medium">
                <span className="text-red-500">*</span> Hotel Name
              </label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Hotel Name"
                className="border rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Contact */}
            <div className="flex flex-col">
              <label className="text-sm font-medium">
                <span className="text-red-500">*</span> Contact
              </label>
              <input
                type="tel"
                name="contact"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                required
                placeholder="Phone number"
                className="border rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* City */}
            <div className="flex flex-col">
              <label className="text-sm font-medium">
                <span className="text-red-500">*</span> City
              </label>
              <select
                name="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
                className="border rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="">Select a city</option>
                <option value="Haryana">Haryana</option>
                <option value="New York">New York</option>
                <option value="Himachal">Himachal</option>
                <option value="Punjab">Punjab</option>
              </select>
            </div>

            {/* Starting Price */}
            <div className="flex flex-col">
              <label className="text-sm font-medium">Starting Price</label>
              <input
                type="number"
                name="startingPrice"
                value={startingPrice}
                onChange={(e) => setStartingPrice(e.target.value)}
                placeholder="₹0"
                className="border rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Rating */}
            <div className="flex flex-col">
              <label className="text-sm font-medium">Rating (0-5)</label>
              <input
                type="number"
                name="rating"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                placeholder="0"
                min="0"
                max="5"
                step="0.1"
                className="border rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Reviews */}
            <div className="flex flex-col">
              <label className="text-sm font-medium">Reviews</label>
              <input
                type="number"
                name="reviews"
                value={reviews}
                onChange={(e) => setReviews(e.target.value)}
                placeholder="50"
                className="border rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Address */}
            <div className="flex flex-col sm:col-span-2">
              <label className="text-sm font-medium">
                <span className="text-red-500">*</span> Address
              </label>
              <textarea
                name="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                placeholder="Hotel Address"
                className="border rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Images */}
            <div className="flex flex-col sm:col-span-2">
              <label className="text-sm font-medium">Images</label>
              <input
                type="file"
                name="images"
                onChange={handleImageChange}
                multiple
                className="border rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Amenities */}
            <div className="flex flex-col sm:col-span-2">
              <label className="font-semibold mb-2">Amenities</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {amenitiesList.map((amenity, idx) => (
                  <label key={idx} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={amenities.includes(amenity)}
                      onChange={() => handleAmenityChange(amenity)}
                      className="w-4 h-4"
                    />
                    <span>{amenity}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Policies */}
            <div className="flex flex-col sm:col-span-2">
              <label className="text-sm font-medium">
                Policies (comma separated)
              </label>
              <textarea
                name="policies"
                value={policies}
                onChange={(e) => setPolicies(e.target.value)}
                placeholder="No smoking, Check-in after 2PM"
                className="border rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Offer */}
            <div className="flex flex-col sm:col-span-2">
              <label className="text-sm font-medium">Offer</label>
              <input
                type="text"
                name="offer"
                value={offer}
                onChange={(e) => setOffer(e.target.value)}
                placeholder="e.g. 20% off"
                className="border rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Submit button */}
            <div className="sm:col-span-2">
              <button
                type="submit"
                className="w-full bg-emerald-800 text-white py-2 rounded-md font-medium hover:bg-emerald-950 transition"
              >
                Register Hotel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterHotel;
