import { useEffect, useState } from "react";
import { FaBed, FaClipboardList } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { useAppContext } from "../../context/AppContext";

const OwnerHotels = () => {
  const { axios, navigate, setSelectedHotel, setShowEditHotelDetails } = useAppContext();
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const { data } = await axios.get("/api/hotels/get-my-hotels");
        setHotels(data.hotels || []);
      } catch (error) {
        console.error("Failed to fetch owner hotels:", error);
      }
    };
    fetchHotels();
  }, [axios, setSelectedHotel]);

  return (
    <div className="p-2 sm:pt-24 sm:pl-64 h-screen overflow-hidden flex flex-col">
      {/* Header */}
      <div className="p-4 sm:p-6 text-emerald-950">
        <h1 className="text-3xl md:text-4xl font-semibold mb-2">My Hotels</h1>
        <p className="text-emerald-900 max-w-full sm:max-w-[65%] text-sm sm:text-base mb-2">
          Your personal space to manage, monitor, and grow all the hotels you
          own — from rooms to bookings, all in one place.
        </p>
      </div>

      {/* Hotels List */}
      <div className="px-4 sm:px-6 flex-1 flex flex-col gap-8 overflow-y-auto">
        {hotels.map((hotel) => {
          const totalRooms = hotel.rooms?.length || 0;
          const activeRooms =
            hotel.rooms?.filter((room) => room.active)?.length || 0;
          const totalBookings =
            hotel.rooms?.reduce(
              (sum, room) => sum + (room.bookings?.length || 0),
              0
            ) || 0;

          return (
            <div
              key={hotel._id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all
              flex flex-col md:flex-row hover:scale-[1.01]"
            >
              {/* Image */}
              <img
                src={hotel.hotelImages?.[0]?.url || "/hotel-placeholder.jpg"}
                alt={hotel.name}
                className="w-full md:w-1/2 h-60 object-cover overflow-hidden rounded-l-xl"
              />

              {/* Content */}
              <div className="p-6 flex flex-col justify-between w-full">
                {/* Top */}
                <div>
                  <h2 className="text-2xl font-medium">{hotel.name}</h2>

                  <div className="flex items-center gap-1 text-gray-600 mt-1">
                    <IoLocationOutline />
                    <p className="text-sm">
                      {hotel.city}, {hotel.address}
                    </p>
                  </div>

                  {/* Stats */}
                  <div className="flex flex-wrap gap-3 mt-4 text-sm">
                    <span className="flex items-center gap-2 bg-emerald-100 px-3 py-1.5 rounded-full">
                      <FaBed />
                      {totalRooms} Rooms
                    </span>

                    <span className="flex items-center gap-2 bg-emerald-100 px-3 py-1.5 rounded-full">
                      <FaBed />
                      {activeRooms} Available
                    </span>

                    <span className="flex items-center gap-2 bg-emerald-100 px-3 py-1.5 rounded-full">
                      <FaClipboardList />
                      {totalBookings} Bookings
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-4 mt-6">
                  <button
                    onClick={() => {
                        setSelectedHotel(hotel);
                        setShowEditHotelDetails(true);
                    }}
                    className="px-5 py-2 rounded-lg bg-emerald-600 text-white
                    font-medium hover:bg-emerald-700 transition"
                  >
                    Edit Hotel Details
                  </button>

                  <button
                    onClick={() => {
                        setSelectedHotel(hotel);
                        navigate("/owner/add-room");
                    }}
                    className="px-5 py-2 rounded-lg border border-emerald-600
                    text-emerald-700 font-medium hover:bg-emerald-50 transition"
                  >
                    Add Rooms
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        {hotels.length === 0 && (
          <div className="text-center bg-emerald-50 p-8 rounded-xl">
            <p className="font-semibold">No hotels listed yet</p>
            <p className="text-sm text-emerald-800 mt-1">
              Add your first hotel to start receiving bookings.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OwnerHotels;
