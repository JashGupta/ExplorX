// src/pages/ListRooms.jsx
import { useEffect, useState } from "react";
import { FaBed, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const OwnerListRooms = () => {
  const { axios, selectedHotel, setSelectedHotel } = useAppContext();
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
    <div className="p-6 md:pt-28 md:pl-72">
      <h1 className="text-3xl font-bold text-emerald-950 mb-6">List Rooms :</h1>

      <div className="px-4 sm:px-6 mb-6">
        <label className="block mb-2 text-sm font-semibold text-emerald-900">
          Select Hotel
        </label>
        <select
          value={selectedHotel._id}
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

      {/* Table for larger screens */}
      <div className="hidden md:block bg-white shadow-md rounded-xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-emerald-100 text-emerald-800 uppercase text-sm">
            <tr>
              <th className="px-6 py-4">Room</th>
              <th className="px-6 py-4">Bed</th>
              <th className="px-6 py-4">Facilities</th>
              <th className="px-6 py-4">Price (₹)</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Toggle</th>
            </tr>
          </thead>
          <tbody>
            {selectedHotel?.rooms.map((room) => (
              <tr
                key={room?._id}
                className="border-b hover:bg-emerald-50 transition"
              >
                <td className="px-6 py-4 font-semibold flex items-center gap-2">
                  <FaBed className="text-emerald-700" /> {room?.roomType}
                </td>
                <td className="px-6 py-4 text-gray-700 font-medium">
                  {room?.bedType || "—"}
                </td>
                <td className="px-6 py-4 text-gray-700">
                  {room?.amenities?.length ? (
                    <>
                      {room.amenities.slice(0, 4).join(", ")}
                      {room.amenities.length > 4 && (
                        <span className="text-emerald-600 text-sm font-light">
                          {" "}
                          +{room.amenities.length - 4} more
                        </span>
                      )}
                    </>
                  ) : (
                    "—"
                  )}
                </td>
                <td className="px-6 py-4 font-bold">₹{room?.price}</td>
                <td className="px-6 py-4">
                  {room?.active ? (
                    <span className="flex items-center gap-1 text-green-600 font-medium">
                      <FaCheckCircle /> Active
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-red-600 font-medium">
                      <FaTimesCircle /> Inactive
                    </span>
                  )}
                </td>
                <td className="px-6 py-4">
                  {/* Toggle Switch */}
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={room.active}
                      onChange={() => toggleRoomStatus(room?._id)}
                    />
                    <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-emerald-500 transition"></div>
                    <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition peer-checked:translate-x-5"></div>
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
