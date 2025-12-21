import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { GiCheckMark } from "react-icons/gi";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const EditRoomDetailsForm = () => {
  const { axios, token, selectedRoom, setShowEditRoomDetails } =
    useAppContext();

  const roomTypes = [
    "Standard Room",
    "Deluxe Room",
    "Premium Room",
    "Family Room",
    "Suite Room",
  ];

  const bedTypes = [
    "Single Bed",
    "Double Bed",
    "Queen Bed",
    "King Bed",
    "Twin Beds",
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

  const [form, setForm] = useState({
    roomType: "",
    roomDescription: "",
    bedType: "",
    price: "",
    capacity: 1,
    active: true,
  });

  const [amenities, setAmenities] = useState([]);
  const [roomImages, setRoomImages] = useState([]);

  useEffect(() => {
    if (selectedRoom) {
      setForm({
        roomType: selectedRoom.roomType || "",
        roomDescription: selectedRoom.roomDescription || "",
        bedType: selectedRoom.bedType || "",
        price: selectedRoom.price || "",
        capacity: selectedRoom.capacity || 1,
        active: selectedRoom.active ?? true,
      });

      setAmenities(selectedRoom.amenities || []);
    }
  }, [selectedRoom, ]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAmenityChange = (item) => {
    setAmenities((prev) =>
      prev.includes(item) ? prev.filter((a) => a !== item) : [...prev, item]
    );
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 4) {
      toast.error("Maximum 4 images allowed");
      return;
    }
    setRoomImages(files);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      Object.entries(form).forEach(([k, v]) => {
        if (v !== "" && v !== null && v !== undefined) {
          formData.append(k, v);
        }
      });

      amenities.forEach((a) => formData.append("amenities[]", a));
      roomImages.forEach((img) => formData.append("roomImages", img));

      const { data } = await axios.put(
        `/api/rooms/edit/${selectedRoom._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (data.success) {
        toast.success("Room updated successfully");
        setShowEditRoomDetails(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update room");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm pt-20">
      <div className="relative w-full max-w-4xl bg-white/20 backdrop-blur-2xl border border-white/30 rounded-2xl shadow-2xl p-6 md:p-8 text-white max-h-[85vh] overflow-y-auto">
        {/* Close */}
        <button
          onClick={() => setShowEditRoomDetails(false)}
          className="absolute top-4 right-4"
        >
          <IoClose size={26} />
        </button>

        <h2 className="text-3xl font-bold text-center mb-1">
          Edit Room Details
        </h2>
        <p className="text-center text-gray-200 mb-6 text-sm">
          Update room information carefully
        </p>

        <form
          onSubmit={submitHandler}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          {/* Room Type */}
          <div>
            <label className="text-sm mb-1 block">Room Type</label>
            <select
              name="roomType"
              value={form.roomType}
              onChange={handleChange}
              className="w-full p-3 rounded-md bg-white/25 border border-white/20"
            >
              <option value="">Select</option>
              {roomTypes.map((r, i) => (
                <option key={i} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>

          {/* Bed Type */}
          <div>
            <label className="text-sm mb-1 block">Bed Type</label>
            <select
              name="bedType"
              value={form.bedType}
              onChange={handleChange}
              className="w-full p-3 rounded-md bg-white/25 border border-white/20"
            >
              <option value="">Select</option>
              {bedTypes.map((b, i) => (
                <option key={i} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>

          {/* Price */}
          <div>
            <label className="text-sm mb-1 block">Price (₹)</label>
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              className="w-full p-3 rounded-md bg-white/25 border border-white/20"
            />
          </div>

          {/* Capacity */}
          <div>
            <label className="text-sm mb-1 block">Capacity</label>
            <input
              type="number"
              name="capacity"
              min="1"
              value={form.capacity}
              onChange={handleChange}
              className="w-full p-3 rounded-md bg-white/25 border border-white/20"
            />
          </div>

          {/* Description */}
          <div className="sm:col-span-2">
            <label className="text-sm mb-1 block">Description</label>
            <textarea
              name="roomDescription"
              value={form.roomDescription}
              onChange={handleChange}
              className="w-full p-3 rounded-md bg-white/25 border border-white/20"
            />
          </div>

          {/* Active */}
          <div
            className="flex items-center gap-3 cursor-pointer sm:col-span-2"
            onClick={() => setForm({ ...form, active: !form.active })}
          >
            <div
              className={`w-5 h-5 border rounded flex items-center justify-center ${
                form.active ? "bg-emerald-500" : "bg-white"
              }`}
            >
              {form.active && <GiCheckMark />}
            </div>
            <span>{form.active ? "Active" : "Inactive"}</span>
          </div>

          {/* Images */}
          <div className="sm:col-span-2">
            <label className="text-sm mb-1 block">Room Images (Max 4)</label>
            <input
              type="file"
              multiple
              onChange={handleImageChange}
              className="w-full p-3 rounded-md bg-white/25 border border-white/20"
            />
          </div>

          {/* Amenities */}
          <div className="sm:col-span-2">
            <label className="text-sm mb-2 block">Amenities</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {amenitiesList.map((a, i) => (
                <label key={i} className="flex items-center gap-2 text-sm">
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

          {/* Submit */}
          <div className="sm:col-span-2 pt-4">
            <button
              type="submit"
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 rounded-lg font-semibold"
            >
              Update Room
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditRoomDetailsForm;
