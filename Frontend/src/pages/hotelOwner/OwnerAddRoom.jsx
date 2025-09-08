// src/pages/AddRoom.jsx
import { useState } from "react";

const AddRoom = () => {
  const [formData, setFormData] = useState({
    images: [],
    roomType: "",
    price: "",
    amenities: [],
  });

  const roomTypes = [
    "Standard Room",
    "Deluxe Room",
    "Executive Suite",
    "Luxury Villa",
  ];
  const amenitiesList = [
    "WiFi",
    "Air Conditioning",
    "TV",
    "Parking",
    "Breakfast",
    "Swimming Pool",
  ];

  // Handle image uploads
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files).slice(0, 4); // max 4 images
    setFormData({ ...formData, images: files });
  };

  // Handle amenities
  const handleAmenityChange = (amenity) => {
    setFormData((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity],
    }));
  };

  // Handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Room Data:", formData);
    alert("Room added successfully!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-emerald-50 md:pt-24 px-4">
      <div className="bg-gray-50 shadow-lg rounded-2xl p-6 sm:p-8 w-full max-w-2xl">
        <h1 className="text-2xl font-bold text-emerald-950 mb-6 text-center sm:text-left">
          Add New Room
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6 text-gray-500">
          {/* Image Upload */}
          <div>
            <label className="block font-semibold mb-2 text-gray-700">
              Upload Room Images (Max 4)
            </label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              className="border rounded-lg p-2 w-full"
            />
            <div className="flex flex-wrap gap-4 mt-3">
              {formData.images.length > 0 &&
                formData.images.map((img, idx) => (
                  <div
                    key={idx}
                    className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden"
                  >
                    <img
                      src={URL.createObjectURL(img)}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
            </div>
          </div>

          {/* Room Type */}
          <div>
            <label className="block font-semibold mb-2 text-gray-700">Room Type</label>
            <select
              value={formData.roomType}
              onChange={(e) =>
                setFormData({ ...formData, roomType: e.target.value })
              }
              className="border rounded-lg p-3 w-full"
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

          {/* Price */}
          <div>
            <label className="block font-semibold mb-2 text-gray-700">Price (₹)</label>
            <input
              type="number"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
              placeholder="Enter price"
              className="border rounded-lg p-3 w-full"
              required
            />
          </div>

          {/* Amenities */}
          <div>
            <label className="block font-semibold mb-2 text-gray-700">Amenities</label>
            <div className="flex flex-wrap">
              {amenitiesList.map((amenity, idx) => (
                <label
                  key={idx}
                  className="flex items-center gap-2 w-full sm:w-1/2 mb-3"
                >
                  <input
                    type="checkbox"
                    checked={formData.amenities.includes(amenity)}
                    onChange={() => handleAmenityChange(amenity)}
                    className="w-4 h-4"
                  />
                  <span>{amenity}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-emerald-800 text-white py-3 rounded-lg font-semibold hover:bg-emerald-900 transition"
          >
            Add Room
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddRoom;
