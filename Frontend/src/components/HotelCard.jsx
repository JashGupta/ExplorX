/* eslint-disable react/prop-types */
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

// eslint-disable-next-line no-unused-vars
const HotelCard = ({ hotel, index }) => {
  return (
    <>
      <Link
        to={`/hotels/${hotel._id}`}
        className="w-60 sm:w-72 bg-white rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition duration-300 overflow-hidden shrink-0"
      >
        <img
          className="h-40 sm:h-44 w-full object-cover rounded-xl"
          src={hotel.images[0]}
          alt={hotel.name}
        />

        <div className="p-4">
          <h3 className="text-lg font-semibold text-slate-900">{hotel.name}</h3>
          <p className="text-sm text-gray-500">{hotel.city}</p>

          <div className="flex items-center mt-2 text-yellow-500">
            {Array.from({ length: 5 }).map((_, index) => (
              <FaStar
                key={index}
                className={
                  index < hotel.rating ? "text-yellow-500" : "text-gray-300"
                }
              />
            ))}
            <span className="text-sm text-gray-600 ml-1">
              ({hotel.reviews} reviews)
            </span>
          </div>

          <div className="mt-3 flex items-center justify-between">
            <p className="text-base font-bold text-slate-900">
              ₹{hotel.price} / night
            </p>
            <button className="bg-gray-700 text-white text-sm font-medium px-3 py-2 rounded-lg hover:bg-gray-800 transition">
              Book Now
            </button>
          </div>
        </div>
      </Link>
    </>
  );
};

export default HotelCard;
