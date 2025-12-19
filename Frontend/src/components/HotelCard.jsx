/* eslint-disable react/prop-types */
import { FaStar } from "react-icons/fa";
import { IoSparkles } from "react-icons/io5";
import { Link } from "react-router-dom";

const HotelCard = ({ hotel }) => {
  return (
    <Link
      to={`/hotels/${hotel._id}`}
      className="flex flex-col w-full max-w-xs sm:max-w-sm md:max-w-md bg-white rounded-2xl shadow-lg hover:shadow-xl hover:scale-102 transition-transform duration-300 overflow-hidden group"
    >
      {/* Hotel Image */}
      <div className="relative">
        <img
          className="h-44 sm:h-52 w-full object-cover group-hover:scale-102 transition-transform duration-500"
          src={hotel.hotelImages[0]?.url || "/placeholder.jpg"}
          alt={hotel.name}
        />
        {/* Premium Badge */}
        {(!hotel.rating || hotel.rating === 0) &&
        (!hotel.reviews || hotel.reviews === 0) ? (
          <span className="absolute top-3 left-3 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 shadow-md">
            <IoSparkles className="text-green-600" size={14} />
            Newly Added
          </span>
        ) : null}
      </div>

      {/* Hotel Info */}
      <div className="p-4 flex flex-col justify-between h-full">
        <div>
          <h3 className="text-lg sm:text-xl font-semibold text-slate-900 truncate">
            {hotel.name}
          </h3>
          <p className="text-sm text-gray-500 mt-1">{hotel.city}</p>

          {/* Rating */}
          {hotel.rating && hotel.rating > 0 ? (
            <div className="flex items-center gap-1 mt-2">
              {Array.from({ length: 5 }).map((_, index) => (
                <FaStar
                  key={index}
                  className={`${
                    index < hotel.rating ? "text-yellow-500" : "text-gray-300"
                  }`}
                />
              ))}
              <span className="text-gray-600 ml-2 text-sm">
                ({hotel.reviews ?? 0}+ reviews)
              </span>
            </div>
          ) : null}
        </div>

        {/* Price & Button */}
        <div className="mt-4 flex items-center justify-between">
          <p className="text-base sm:text-lg font-bold text-slate-900">
            ₹{hotel.startingPrice.toLocaleString()} / night
          </p>
          <button className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm sm:text-base font-medium px-4 py-2 rounded-xl shadow-md transition-all">
            Book Now
          </button>
        </div>
      </div>
    </Link>
  );
};

export default HotelCard;
