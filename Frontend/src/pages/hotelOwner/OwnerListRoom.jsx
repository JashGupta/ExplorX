// src/pages/ListRooms.jsx
import { useEffect, useState } from "react";
import { FaBed } from "react-icons/fa";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const OwnerListRooms = () => {
  const { axios, selectedHotel, setSelectedHotel, setShowEditRoomDetails, setSelectedRoom } = useAppContext();
  const [hotels, setHotels] = useState([]);

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

  const toggleRoomStatus = async (_id) => {
    try {
      const { data } = await axios.patch(
        `/api/rooms/toggle-availability/${_id}`
      );
      if (data.success) {
        toast.success(data.message);

        const updatedHotels = hotels.map((hotel) => {
          if (hotel._id === selectedHotel._id) {
            const updatedRooms = hotel.rooms.map((room) => {
              if (room._id === _id) {
                return { ...room, active: !room.active };
              }
              return room;
            });
            return { ...hotel, rooms: updatedRooms };
          }
          return hotel;
        });
        setHotels(updatedHotels);
        setSelectedHotel(
          updatedHotels.find((hotel) => hotel._id === selectedHotel._id)
        );
      } else {
        toast.error("Failed to toggle room status");
      }
    } catch (error) {
      console.error("Error toggling room status:", error);
      toast.error("Failed to toggle room status");
    }
  };

  return (
    <div className="p-2 sm:pt-24 sm:pl-64 h-screen overflow-hidden flex flex-col">
      {/* Header */}
      <div className="p-4 sm:p-6 text-emerald-950">
        <h1 className="text-3xl md:text-4xl font-semibold mb-2">
          List Rooms :
        </h1>
        <p className="text-emerald-900 max-w-full sm:max-w-[65%] text-sm sm:text-base mb-2">
          View all rooms for a selected hotel, update room details, and control availability in real time.
        </p>
        <div className="py-4">
          <label className="block mb-2 text-sm font-semibold text-emerald-900">
            Select Hotel
          </label>
          <select
            value={selectedHotel?._id}
            defaultValue={hotels[0]}
            onChange={(e) => {
              const hotel = hotels.find((h) => h._id === e.target.value);
              setSelectedHotel(hotel);
            }}
            className="w-full sm:w-96 p-3 rounded-lg border border-emerald-500 focus:outline-none"
          >
            <option value="">-- Choose a Hotel --</option>
            {hotels.map((hotel) => (
              <option key={hotel._id} value={hotel._id}>
                {hotel.name} ({hotel.city})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Rooms List */}
      <div className="px-4 sm:px-6 flex-1 flex flex-col gap-8 overflow-y-auto pb-8">
        {selectedHotel?.rooms?.map((room) => (
          <div
            key={room?._id}
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all
      flex flex-col md:flex-row hover:scale-[1.01]"
          >
            {/* Room Image */}
            <img
              src={room.roomImages?.[0]?.url || "/room-placeholder.jpg"}
              alt={room.roomType}
              className="w-full md:w-2/3 h-68 object-cover overflow-hidden rounded-l-xl"
            />

            {/* Content */}
            <div className="p-6 flex flex-col justify-between w-full">
              {/* Top */}
              <div>
                <h2 className="text-2xl font-medium">{room.roomType}</h2>

                <p className="text-sm text-gray-600 mt-1">
                  Bed Type:{" "}
                  <span className="font-medium">{room.bedType || "—"}</span>
                </p>

                {/* Stats (same style as hotels) */}
                <div className="flex flex-wrap gap-3 mt-4 text-sm">
                  <span className="flex items-center gap-2 bg-emerald-100 px-3 py-1.5 rounded-full">
                    <FaBed />
                    {room.capacity || "—"} Guests
                  </span>

                  <span className="flex items-center gap-2 bg-emerald-100 px-3 py-1.5 rounded-full">
                    ₹{room.price}
                  </span>

                  <span
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-full
              ${
                room.active
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
                  >
                    {room.active ? "Active" : "Inactive"}
                  </span>
                </div>

                {/* Amenities */}
                <p className="text-sm text-gray-700 mt-4">
                  <span className="font-semibold">Amenities:</span>{" "}
                  {room.amenities?.length ? room.amenities.join(" • ") : "—"}
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-4 mt-6">
                <button
                onClick={() => {
                  setSelectedRoom(room);
                  setShowEditRoomDetails(true);
                }}
                  className="px-5 py-2 rounded-lg bg-emerald-600 text-white
            font-medium hover:bg-emerald-700 transition"
                >
                  Edit Room Details
                </button>

                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={room.active}
                    onChange={() => toggleRoomStatus(room._id)}
                  />
                  <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-emerald-500 transition"></div>
                  <div className="absolute left-1 top-3 bg-white w-4 h-4 rounded-full transition peer-checked:translate-x-5"></div>
                </label>
              </div>
            </div>
          </div>
        ))}

        {selectedHotel?.rooms?.length === 0 && (
          <div className="text-center bg-emerald-50 p-8 rounded-xl">
            <p className="font-semibold">No rooms added yet</p>
            <p className="text-sm text-emerald-800 mt-1">
              Add rooms to start receiving bookings.
            </p>
          </div>
        )}
      </div>

      {/* Card layout for phones */}
      <div className="grid gap-4 md:hidden">
        {selectedHotel?.rooms.map((room) => (
          <div
            key={room?._id}
            className="bg-white shadow-md rounded-xl p-4 flex flex-col gap-3"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold flex items-center gap-2">
                <FaBed className="text-emerald-700" /> {room?.roomType}
              </h2>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={room?.active}
                  onChange={() => toggleRoomStatus(room._id)}
                />
                <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-green-500 transition"></div>
                <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition peer-checked:translate-x-5"></div>
              </label>
            </div>

            <p className="text-gray-700 text-sm">
              Facilities: {room?.amenities.join(", ")}
            </p>

            <p className="font-bold text-emerald-900">₹{room.price}</p>

            <p
              className={
                room?.active
                  ? "text-green-600 font-medium"
                  : "text-red-600 font-medium"
              }
            >
              {room?.active ? "Active" : "Inactive"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OwnerListRooms;
