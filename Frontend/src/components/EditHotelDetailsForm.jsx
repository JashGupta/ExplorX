import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const EditHotelDetailsForm = () => {
  const { setShowEditHotelDetails, axios, token, selectedHotel } =
    useAppContext();

  const [form, setForm] = useState({
    name: selectedHotel?.name || "",
    contact: "",
    address: "",
    city: "",
    startingPrice: "",
    description: "",
    rating: "",
    reviews: "",
    offer: "",
  });

  useEffect(() => {
    if (selectedHotel) {
      setForm({
        name: selectedHotel.name || "",
        contact: selectedHotel.contact || "",
        address: selectedHotel.address || "",
        city: selectedHotel.city || "",
        startingPrice: selectedHotel.startingPrice || "",
        description: selectedHotel.description || "",
        rating: selectedHotel.rating || "",
        reviews: selectedHotel.reviews || "",
        offer: selectedHotel.offer || "",
      });

      setAmenities(selectedHotel.amenities || []);
      setPolicies(selectedHotel.policies || []);
    }
  }, [selectedHotel]);

  const [amenities, setAmenities] = useState([]);
  const [policies, setPolicies] = useState([]);
  const [hotelImages, setHotelImages] = useState([]);

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

  const policiesList = [
    "No Smoking",
    "No Pets Allowed",
    "Check-in after 12 PM",
    "Check-out before 11 AM",
    "Valid ID required",
  ];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAmenityChange = (item) => {
    setAmenities((prev) =>
      prev.includes(item) ? prev.filter((a) => a !== item) : [...prev, item]
    );
  };

  const handlePoliciesChange = (item) => {
    setPolicies((prev) =>
      prev.includes(item) ? prev.filter((a) => a !== item) : [...prev, item]
    );
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    if (files.length > 4) {
      toast.error("You can upload max 4 images.");
      return;
    }

    setHotelImages(files);
  };

  const validateForm = () => {
    if (form.name && form.name.trim().length < 3)
      return "Hotel name must be at least 3 characters";

    if (form.contact && !/^\d{10}$/.test(form.contact))
      return "Enter a valid 10-digit contact number";

    if (
      form.startingPrice &&
      (isNaN(form.startingPrice) || Number(form.startingPrice) <= 0)
    )
      return "Starting price must be a positive number";

    if (form.rating && (form.rating < 0 || form.rating > 5))
      return "Rating must be between 0 and 5";

    if (form.reviews && form.reviews < 0) return "Reviews cannot be negative";

    return null;
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const errorMsg = validateForm();
    if (errorMsg) return toast.error(errorMsg);

    try {
      const formData = new FormData();

      Object.entries(form).forEach(([k, v]) => {
        if (v !== "" && v !== null) {
          formData.append(k, v);
        }
      });

      if (amenities.length > 0) {
        amenities.forEach((a) => formData.append("amenities[]", a));
      }

      if (policies.length > 0) {
        policies.forEach((p) => formData.append("policies[]", p));
      }

      if (hotelImages.length > 0) {
        hotelImages.forEach((img) => formData.append("hotelImages", img));
      }

      const { data } = await axios.put(`/api/hotels/edit/${selectedHotel._id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (data.success) {
        toast.success("Hotel details updated successfully");
        setShowEditHotelDetails(false);
      } else {
        toast.error(data.response?.data?.message || "Registration failed");
      }
    } catch (error) {
      toast.error("Registration failed: " + error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm pt-20">
      <div className="relative w-full max-w-5xl bg-white/20 backdrop-blur-2xl border border-white/30 rounded-2xl shadow-2xl p-6 md:p-8 text-white overflow-y-auto max-h-[85vh]">
        {/* Close Button */}
        <button
          onClick={() => setShowEditHotelDetails(false)}
          className="absolute top-4 right-4 text-white hover:text-gray-300"
        >
          <IoClose size={26} />
        </button>

        {/* Heading */}
        <h2 className="text-3xl font-bold text-center mb-1">
          Edit Hotel Details
        </h2>
        <p className="text-center text-gray-200 mb-6 text-sm">
          Fill in the details carefully !
        </p>

        <form
          onSubmit={submitHandler}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          {/* Hotel Name */}
          <div>
            <label className="text-sm mb-1 block">
              Hotel Name <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Hotel Name"
              className="w-full p-3 rounded-md bg-white/25 text-white placeholder-gray-200 border border-white/20 focus:ring-2 focus:ring-emerald-300 outline-none"
            />
          </div>

          {/* Contact Number */}
          <div>
            <label className="text-sm mb-1 block">
              Contact Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              name="contact"
              value={form.contact}
              onChange={handleChange}
              placeholder="Phone Number"
              className="w-full p-3 rounded-md bg-white/25 text-white placeholder-gray-200 border border-white/20 focus:ring-2 focus:ring-emerald-300 outline-none"
            />
          </div>

          {/* Full Address */}
          <div className="sm:col-span-2">
            <label className="text-sm mb-1 block">
              Full Address <span className="text-red-500">*</span>
            </label>
            <textarea
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="Complete address"
              className="w-full p-3 rounded-md bg-white/25 text-white border border-white/20 focus:ring-2 focus:ring-emerald-300 outline-none"
            />
          </div>

          {/* City */}
          <div className="sm:col-span-2">
            <label className="text-sm mb-1 block">
              Select City <span className="text-red-500">*</span>
            </label>
            <select
              name="city"
              value={form.city}
              onChange={handleChange}
              className="w-full p-3 rounded-md bg-white/25 text-white border border-white/20 focus:ring-2 focus:ring-emerald-300 outline-none"
            >
              <option value="">Choose City</option>
              <option value="Haryana">Haryana</option>
              <option value="Himachal">Himachal</option>
              <option value="Punjab">Punjab</option>
              <option value="New York">New York</option>
            </select>
          </div>

          {/* Starting Price */}
          <div>
            <label className="text-sm mb-1 block">
              Starting Price <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="startingPrice"
              value={form.startingPrice}
              onChange={handleChange}
              placeholder="₹0"
              className="w-full p-3 rounded-md bg-white/25 text-white placeholder-gray-200 border border-white/20 focus:ring-2 focus:ring-emerald-300 outline-none"
            />
          </div>

          {/* Offer */}
          <div>
            <label className="text-sm mb-1 block">Offer</label>
            <input
              type="text"
              name="offer"
              value={form.offer}
              onChange={handleChange}
              placeholder="20% Off"
              className="w-full p-3 rounded-md bg-white/25 text-white placeholder-gray-200 border border-white/20 focus:ring-2 focus:ring-emerald-300 outline-none"
            />
          </div>

          {/* Hotel Images */}
          <div className="sm:col-span-2">
            <label className="text-sm mb-1 block">
              Hotel Images (Max 4) <span className="text-red-500">*</span>
            </label>
            <input
              type="file"
              multiple
              onChange={handleImageChange}
              className="w-full p-3 rounded-md bg-white/25 text-white border border-white/20"
            />

            {/* Preview */}
            {hotelImages.length > 0 && (
              <div className="flex gap-3 mt-2">
                {hotelImages.map((img, i) => (
                  <div key={i} className="w-20 h-20 rounded overflow-hidden">
                    <img
                      src={URL.createObjectURL(img)}
                      alt="preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Description */}
          <div className="sm:col-span-2">
            <label className="text-sm mb-1 block">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Describe your hotel"
              className="w-full p-3 rounded-md bg-white/25 text-white border border-white/20 focus:ring-2 focus:ring-emerald-300 outline-none"
            />
          </div>

          {/* Amenities */}
          <div className="sm:col-span-2">
            <label className="text-sm mb-2 block">Amenities</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {amenitiesList.map((a, idx) => (
                <label key={idx} className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={amenities.includes(a)}
                    onChange={() => handleAmenityChange(a)}
                  />
                  {a}
                </label>
              ))}
            </div>
          </div>

          {/* Rating */}
          <div>
            <label className="text-sm mb-1 block">Rating (0-5)</label>
            <input
              type="number"
              min="0"
              max="5"
              step="0.1"
              name="rating"
              value={form.rating}
              onChange={handleChange}
              placeholder="4.5"
              className="w-full p-3 rounded-md bg-white/25 text-white placeholder-gray-200 border border-white/20 focus:ring-2 focus:ring-emerald-300 outline-none"
            />
          </div>

          {/* Reviews */}
          <div>
            <label className="text-sm mb-1 block">Reviews</label>
            <input
              type="number"
              name="reviews"
              value={form.reviews}
              onChange={handleChange}
              placeholder="120"
              className="w-full p-3 rounded-md bg-white/25 text-white placeholder-gray-200 border border-white/20 focus:ring-2 focus:ring-emerald-300 outline-none"
            />
          </div>

          {/* Amenities */}
          <div className="sm:col-span-2">
            <label className="text-sm mb-2 block">Policies</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {policiesList.map((a, idx) => (
                <label key={idx} className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={policies.includes(a)}
                    onChange={() => handlePoliciesChange(a)}
                  />
                  {a}
                </label>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="sm:col-span-2 pt-3">
            <button
              type="submit"
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg shadow-lg transition-all"
            >
              Edit Hotel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditHotelDetailsForm;
