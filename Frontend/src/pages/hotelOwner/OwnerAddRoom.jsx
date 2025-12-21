// src/pages/AddRoom.jsx
import { useState, useEffect } from "react";
import { GiCheckMark } from "react-icons/gi";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const AddRoom = () => {
  const { axios, token, selectedHotel, setSelectedHotel } = useAppContext();

  const [roomType, setRoomType] = useState("Standard Room");
  const [roomDescription, setRoomDescription] = useState("");
  const [bedType, setBedType] = useState("Double Bed");
  const bedTypes = [
    "Single Bed",
    "Double Bed",
    "Queen Bed",
    "King Bed",
    "Twin Beds",
  ];

  const [price, setPrice] = useState("");
  const [capacity, setCapacity] = useState(2);
  const [active, setActive] = useState(true);
  const [roomImages, setRoomImages] = useState([]);
  const [amenities, setAmenities] = useState([]);

  const [hotels, setHotels] = useState([]);

  const roomTypes = [
    "Standard Room",
    "Deluxe Room",
    "Premium Room",
    "Family Room",
    "Suite Room",
  ];
  const amenitiesList = [
    "WiFi",
    "TV",
    "Air Conditioning",
    "Geyser",
    "Work Desk",
    "Toiletries",
    "Hot Water",
    "Wardrobe",
    "Kettle",
  ];

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const { data } = await axios.get("/api/hotels/get-my-hotels");
        setHotels(data.hotels || []);
      } catch (error) {
        console.error("Failed to fetch hotels:", error);
      }
    };
    fetchHotels();
  }, [axios]);

  useEffect(() => {
    if (hotels.length > 0 && !selectedHotel) {
      setSelectedHotel(hotels[0]);
    }
  }, [hotels, selectedHotel]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files).slice(0, 4);
    setRoomImages(files);
  };

  const handleAmenityChange = (amenity) => {
    setAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((a) => a !== amenity)
        : [...prev, amenity]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("hotel", selectedHotel._id);
      formData.append("roomType", roomType);
      formData.append("roomDescription", roomDescription);
      formData.append("bedType", bedType);
      formData.append("price", price);
      formData.append("capacity", capacity);
      formData.append("active", active);

      amenities.forEach((a) => formData.append("amenities[]", a));
      roomImages.forEach((img) => formData.append("roomImages", img));

      const { data } = await axios.post("/api/rooms/add-room", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (data.success) {
        toast.success(data.message || "Room added successfully!");
        // reset form
        setRoomType("");
        setRoomDescription("");
        setBedType("");
        setPrice("");
        setCapacity(1);
        setActive(true);
        setRoomImages([]);
        setAmenities([]);
      } else {
        toast.error(data.message || "Failed to add room");
      }
    } catch (error) {
      toast.error(
        "Error adding room: " + error.response?.data?.message || error.message
      );
    }
  };

  return (
    <div className="h-screen sm:pl-64 sm:pt-24 bg-emerald-50 overflow-hidden flex flex-col">
      {/* Header */}
      <div className="p-4 sm:px-8 text-emerald-950 shrink-0">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2">Add New Room</h1>
        <p className="text-emerald-900 max-w-full sm:max-w-[75%] text-sm sm:text-base">
          Add a new room to your hotel listing. Upload images, set the price,
          capacity, and select amenities.
        </p>
      </div>

      {/* Form */}
      <div className="flex-1 overflow-y-auto p-4 sm:px-6 pb-8">
        <div className="bg-white shadow-lg rounded-xl p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-6 text-gray-700">
            {/* Hotel & Room Type */}
            <div className="flex flex-col md:flex-row md:space-x-6 space-y-4 md:space-y-0">
              <div className="flex-1">
                <label className="block font-semibold mb-2">
                  Select Hotel <span className="text-red-600">*</span>
                </label>
                <select
                  value={selectedHotel?._id}
                  onChange={(e) => {
                    const hotel = hotels.find((h) => h._id === e.target.value);
                    setSelectedHotel(hotel);
                  }}
                  className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-emerald-400 outline-none"
                  required
                >
                  <option value="">Choose Hotel</option>
                  {hotels.map((hotel) => (
                    <option key={hotel._id} value={hotel._id}>
                      {hotel.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex-1">
                <label className="block font-semibold mb-2">
                  Room Type <span className="text-red-600">*</span>
                </label>
                <select
                  value={roomType}
                  onChange={(e) => setRoomType(e.target.value)}
                  className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-emerald-400 outline-none"
                  required
                >
                  <option value="">Select Room Type</option>
                  {roomTypes.map((type, idx) => (
                    <option key={idx} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Room Description and Bed Type */}
            <div>
              <label className="block font-semibold mb-2">
                Room Description
              </label>
              <textarea
                value={roomDescription}
                onChange={(e) => setRoomDescription(e.target.value)}
                className="border rounded-lg p-3 w-full h-28 focus:ring-2 focus:ring-emerald-400 outline-none"
                placeholder="Describe the room, view, interior, space, etc."
              ></textarea>
            </div>
            <div className="flex-1">
              <label className="block font-semibold mb-2">Bed Type</label>
              <select
                value={bedType}
                onChange={(e) => setBedType(e.target.value)}
                className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-emerald-400 outline-none"
              >
                <option value="">Select Bed Type</option>
                {bedTypes.map((b, idx) => (
                  <option key={idx} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>

            {/* Price & Capacity */}
            <div className="flex flex-col md:flex-row md:space-x-6 space-y-4 md:space-y-0">
              <div className="flex-1">
                <label className="block font-semibold mb-2">
                  Price (₹) <span className="text-red-600">*</span>
                </label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="Enter price"
                  className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-emerald-400 outline-none"
                  min="0"
                  required
                />
              </div>

              <div className="flex-1">
                <label className="block font-semibold mb-2">Capacity</label>
                <input
                  type="number"
                  value={capacity}
                  onChange={(e) => setCapacity(e.target.value)}
                  className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-emerald-400 outline-none"
                  min="1"
                />
              </div>
            </div>

            {/* Active Status */}
            <div
              className={`flex items-center gap-3 cursor-pointer select-none ${
                active ? "text-emerald-800" : "text-gray-700"
              }`}
              onClick={() => setActive(!active)}
            >
              <div
                className={`w-5 h-5 border rounded-md shrink-0 flex items-center justify-center ${
                  active
                    ? "bg-emerald-500 border-emerald-500"
                    : "border-gray-400 bg-white"
                }`}
              >
                {active && <GiCheckMark />}
              </div>
              <label className="font-semibold">
                {active ? "Active" : "Inactive"}
              </label>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block font-semibold mb-3">
                Upload Room images (Max 4){" "}
                <span className="text-red-600">*</span>
              </label>
              <input
                type="file"
                accept="image/*"
                required
                multiple
                onChange={handleImageChange}
                className="border rounded-lg p-2 w-full focus:ring-2 focus:ring-emerald-400 outline-none"
              />
              <div className="flex flex-wrap gap-4 mt-4">
                {roomImages.map((img, idx) => (
                  <div
                    key={idx}
                    className="w-24 h-24 rounded-lg overflow-hidden shadow relative group"
                  >
                    <img
                      src={
                        typeof img === "string" ? img : URL.createObjectURL(img)
                      }
                      alt="Preview"
                      className="w-full h-full object-cover transform group-hover:scale-110 transition"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Amenities */}
            <div>
              <label className="block font-semibold mb-3">Amenities</label>
              <div className="flex flex-wrap gap-3">
                {amenitiesList.map((amenity, idx) => (
                  <label
                    key={idx}
                    className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-lg px-8 py-2 cursor-pointer hover:bg-emerald-100 transition"
                  >
                    <input
                      type="checkbox"
                      checked={amenities.includes(amenity)}
                      onChange={() => handleAmenityChange(amenity)}
                      className="w-4 h-4 accent-emerald-500"
                    />
                    <span className="text-gray-700 text-sm">{amenity}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-emerald-600 text-white py-3 rounded-xl font-semibold hover:bg-emerald-700 transition shadow-md"
            >
              Add Room
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddRoom;
