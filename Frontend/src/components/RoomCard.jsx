/* eslint-disable react/prop-types */
import { FaUserFriends } from "react-icons/fa";
import { MdCheckCircle } from "react-icons/md";
import { Link } from "react-router-dom";

const RoomCard = ({ room }) => {
  return (
    <>
    <Link to={`/rooms/${room._id}`}
      className="flex w-full h-72 rounded-3xl bg-white border border-gray-100 shadow-md 
                 overflow-hidden hover:shadow-2xl hover:-translate-y-1 hover:scale-[1.01] 
                 transition-all duration-300"
    >
      {/* Image Section */}
      <div className="relative w-1/3 h-full">
        <img
          src={room?.roomImages?.[0]?.url}
          alt={room.roomType}
          className="w-full h-full object-cover"
        />

        {/* Popular Badge (based on bookings count) */}
        {room.bookings?.length > 3 && (
          <span className="absolute bottom-3 left-3 bg-yellow-400 text-black text-xs 
                           font-semibold px-3 py-1 rounded-full shadow">
            Popular Choice ⭐
          </span>
        )}
      </div>

      {/* Content Section */}
      <div className="p-6 flex flex-col justify-between flex-1">
        <div>
          {/* Room Heading */}
          <div className="flex items-center justify-between">
            <h3 className="text-xl text-emerald-950 font-semibold">
              {room.roomType}
            </h3>

            <div className="flex items-center gap-1 text-gray-500 text-xs">
              <MdCheckCircle className="text-emerald-600" size={18} />
              Verified
            </div>
          </div>

          {/* Price */}
          <p className="text-emerald-900 font-bold text-xl mt-2">
            ₹{room.price}
            <span className="text-sm text-gray-500 font-normal"> / night</span>
          </p>

          {/* Capacity */}
          <div className="flex items-center gap-2 mt-2 text-gray-700 text-sm">
            <FaUserFriends /> {room.capacity} Guests
          </div>

          {/* Amenities */}
          <div className="flex flex-wrap gap-2 mt-4">
            {room.amenities?.slice(0, 5).map((a, i) => (
              <span
                key={i}
                className="px-3 py-1 bg-emerald-50 text-emerald-900 rounded-full 
                           text-xs border border-emerald-100 shadow-sm"
              >
                {a}
              </span>
            ))}

            {room.amenities?.length > 5 && (
              <span className="text-xs text-gray-500">+ more</span>
            )}
          </div>
        </div>

        {/* Book Button */}
        <button
          disabled={!room.active}
          className={`w-full py-3 rounded-xl text-white font-medium mt-4 transition 
            ${
              room.active
                ? "bg-emerald-800 hover:bg-emerald-900 hover:shadow-lg"
                : "bg-gray-400 cursor-not-allowed"
            }`}
        >
          {room.active ? "Book Now" : "Unavailable"}
        </button>
      </div>
    </Link>
    </>
  );
};

export default RoomCard;
