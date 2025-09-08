// src/pages/ListRooms.jsx
import { useState } from "react";
import { FaBed, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const OwnerListRooms = () => {
  const [rooms, setRooms] = useState([
    {
      id: 1,
      name: "Deluxe Room",
      price: 2500,
      facilities: ["WiFi", "TV", "Air Conditioning"],
      active: true,
    },
    {
      id: 2,
      name: "Luxury Suite",
      price: 5000,
      facilities: ["WiFi", "Breakfast", "Swimming Pool", "Parking"],
      active: false,
    },
    {
      id: 3,
      name: "Standard Room",
      price: 1500,
      facilities: ["WiFi", "Parking"],
      active: true,
    },
  ]);

  // Toggle room status
  const toggleRoomStatus = (id) => {
    setRooms((prevRooms) =>
      prevRooms.map((room) =>
        room.id === id ? { ...room, active: !room.active } : room
      )
    );
  };

  return (
    <div className="p-6 md:pt-28 md:pl-72">
      <h1 className="text-3xl font-bold text-emerald-950 mb-6">List Rooms :</h1>

      {/* Table for larger screens */}
      <div className="hidden md:block bg-white shadow-md rounded-xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-emerald-100 text-emerald-800 uppercase text-sm">
            <tr>
              <th className="px-6 py-4">Room</th>
              <th className="px-6 py-4">Facilities</th>
              <th className="px-6 py-4">Price (₹)</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Toggle</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((room) => (
              <tr
                key={room.id}
                className="border-b hover:bg-emerald-50 transition"
              >
                <td className="px-6 py-4 font-semibold flex items-center gap-2">
                  <FaBed className="text-emerald-700" /> {room.name}
                </td>
                <td className="px-6 py-4 text-gray-700">
                  {room.facilities.join(", ")}
                </td>
                <td className="px-6 py-4 font-bold">₹{room.price}</td>
                <td className="px-6 py-4">
                  {room.active ? (
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
                      onChange={() => toggleRoomStatus(room.id)}
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
        {rooms.map((room) => (
          <div
            key={room.id}
            className="bg-white shadow-md rounded-xl p-4 flex flex-col gap-3"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold flex items-center gap-2">
                <FaBed className="text-emerald-700" /> {room.name}
              </h2>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={room.active}
                  onChange={() => toggleRoomStatus(room.id)}
                />
                <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-green-500 transition"></div>
                <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition peer-checked:translate-x-5"></div>
              </label>
            </div>

            <p className="text-gray-700 text-sm">
              Facilities: {room.facilities.join(", ")}
            </p>

            <p className="font-bold text-emerald-900">₹{room.price}</p>

            <p className={room.active ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
              {room.active ? "Active" : "Inactive"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OwnerListRooms;
