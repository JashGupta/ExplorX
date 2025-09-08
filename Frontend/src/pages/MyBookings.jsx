import userBookings from "../data/userData";
import { IoLocationOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";

const MyBookings = () => {
  return (
    <div className="mx-auto px-4 sm:px-8 lg:px-20 py-12 pt-32 w-full">
      {/* Header */}
      <h1 className="text-3xl sm:text-4xl font-bold mb-3">My Bookings</h1>
      <p className="text-gray-600 mb-12 max-w-2xl text-base sm:text-lg">
        Easily manage your past, current, and upcoming hotel reservations in one place. 
        Plan your trips seamlessly with just a few clicks.
      </p>

      {/* Table-like header (hide on mobile) */}
      <div className="hidden sm:flex justify-between font-semibold text-gray-500 border-b pb-4 mb-8 text-lg">
        <span className="md:basis-3/6 lg:basis-3/6">Hotels</span>
        <span className="md:basis-2/7 lg:basis-2/7">Date & Timings</span>
        <span className="md:basis-1/6 lg:basis-1/6">Payment</span>
      </div>

      {/* Bookings List */}
      <div className="flex flex-col gap-8">
        {userBookings.map((booking) => (
          <div
            key={booking.id}
            className="flex flex-col sm:flex-row sm:items-center bg-white rounded-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            {/* Hotel Info */}
            <div className="flex flex-col sm:flex-row flex-1 gap-6 p-6 md:basis-3/6 lg:basis-3/6">
              <div className="w-full sm:w-56 h-40 flex-shrink-0">
                <img
                  src={booking.image}
                  alt={booking.hotelName}
                  className="w-full h-full rounded-xl object-cover"
                />
              </div>
              <div className="flex flex-col">
                <h2 className="font-semibold text-lg sm:text-xl mb-2">
                  {booking.hotelName}
                  <span className="text-sm sm:text-base font-normal text-gray-600 ml-2">
                    ({booking.roomType})
                  </span>
                </h2>
                <p className="text-gray-500 flex items-center gap-2 text-sm sm:text-base">
                  <IoLocationOutline className="text-lg" /> {booking.location}
                </p>
                <p className="text-gray-500 flex items-center gap-2 text-sm sm:text-base">
                  <FaRegUser className="text-lg" /> Guests: {booking.guests}
                </p>
                <p className="font-semibold text-sm sm:text-base text-gray-800 mt-2  ">
                  Total: ₹{booking.total}
                </p>
              </div>
            </div>

            {/* Dates */}
            <div className="flex flex-col sm:items-start text-sm sm:text-base text-gray-700 flex-1 gap-2 p-6 border-t sm:border-t-0 sm:border-l border-gray-100 md:basis-2/6 lg:basis-2/6">
              <p>
                <span className="font-semibold">Check-In:</span> {booking.checkIn}
              </p>
              <p>
                <span className="font-semibold">Check-Out:</span> {booking.checkOut}
              </p>
            </div>

            {/* Payment */}
            <div className="flex items-start sm:items-center gap-4 text-sm sm:text-base p-6 border-t sm:border-t-0 sm:border-l border-gray-100 md:basis-1/6 lg:basis-1/6">
              {booking.status === "Paid" ? (
                <span className="flex items-center gap-2 text-green-600 font-semibold">
                  <span className="w-3 h-3 bg-green-600 rounded-full"></span>
                  Paid
                </span>
              ) : (
                <div className="flex flex-col gap-2">
                  <span className="flex items-center gap-2 text-red-600 font-semibold">
                    <span className="w-3 h-3 bg-red-600 rounded-full"></span>
                    Unpaid
                  </span>
                  <button className="border border-red-500 text-red-600 rounded-lg px-3 py-1 text-xs hover:bg-red-50 transition">
                    Pay Now
                  </button>
                </div>
              )}
            </div>
            <div className="border-t sm:hidden"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBookings;
