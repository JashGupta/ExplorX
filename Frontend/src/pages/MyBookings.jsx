import { IoLocationOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import { useAppContext } from "../context/AppContext.jsx";
import { useEffect, useState } from "react";

const MyBookings = () => {
  const { axios, token } = useAppContext();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    if (!token) return;
    const fetchBookings = async () => {
      try {
        const res = await axios.get("/api/bookings/get-my-bookings");

        if (res.data.success) {
          setBookings(res.data.bookings);
        } else {
          setBookings([]);
        }
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookings();
  }, [axios, token]);

  return (
    <div className="mx-auto px-4 sm:px-8 lg:px-20 py-12 pt-32 w-full">
      {/* Header */}
      <h1 className="text-3xl sm:text-4xl font-bold mb-3">My Bookings</h1>
      <p className="text-gray-600 mb-12 max-w-2xl text-base sm:text-lg">
        Easily manage your past, current, and upcoming hotel reservations in one
        place. Plan your trips seamlessly with just a few clicks.
      </p>

      {/* Table-like header (hide on mobile) */}
      <div className="hidden sm:flex justify-between font-semibold text-gray-500 border-b pb-4 mb-8 text-lg">
        <span className="md:basis-3/6 lg:basis-3/6">Hotels</span>
        <span className="md:basis-2/7 lg:basis-2/7">Date & Timings</span>
        <span className="md:basis-1/6 lg:basis-1/6">Payment</span>
      </div>

      {/* Bookings List */}
      <div className="flex flex-col gap-10">
        {bookings.map((booking) => (
          <div
            key={booking._id}
            className="bg-white rounded-3xl border border-gray-50 overflow-hidden hover:shadow-2xl transition-all duration-300"
          >
            <div className="flex flex-col lg:flex-row">
              {/* Image Section */}
              <div className="relative w-full lg:w-80 h-64">
                <img
                  src={booking.snapshot.image}
                  alt={booking.snapshot.hotelName}
                  className="w-full h-full object-cover"
                />

                {/* Status Badge */}
                <span
                  className={`absolute top-5 left-5 px-4 py-1 text-xs font-semibold rounded-full backdrop-blur-md ${
                    booking.status === "Paid"
                      ? "bg-green-100/80 text-green-800"
                      : "bg-yellow-100/80 text-yellow-800"
                  }`}
                >
                  {booking.status}
                </span>
              </div>

              {/* Right Content */}
              <div className="flex flex-1 flex-col lg:flex-row p-6 lg:p-8 gap-8">
                {/* Left Info */}
                <div className="flex-1 flex flex-col gap-3">
                  <h2 className="text-2xl font-semibold text-gray-900">
                    {booking.snapshot.hotelName}
                  </h2>

                  <p className="text-sm text-gray-500 tracking-wide">
                    {booking.snapshot.roomType}
                  </p>

                  <div className="flex items-center gap-2 text-gray-600 text-sm">
                    <IoLocationOutline className="text-lg" />
                    {booking.snapshot.location}
                  </div>

                  <div className="flex items-center gap-2 text-gray-600 text-sm">
                    <FaRegUser className="text-lg" />
                    {booking.guests} Guests
                  </div>

                  {/* Divider */}
                  <div className="w-full h-px bg-gray-100 my-2"></div>

                  <p className="text-xs text-gray-500">
                    Booked on{" "}
                    <span className="font-medium text-gray-700">
                      {new Date(booking.createdAt).toLocaleDateString()}
                    </span>
                  </p>
                </div>

                {/* Middle – Dates */}
                <div className="flex flex-col justify-center gap-4 text-sm text-gray-700 min-w-[200px]">
                  <div>
                    <p className="text-xs uppercase text-gray-400 tracking-wide">
                      Check-In
                    </p>
                    <p className="font-semibold">
                      {new Date(booking.checkIn).toLocaleDateString()}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs uppercase text-gray-400 tracking-wide">
                      Check-Out
                    </p>
                    <p className="font-semibold">
                      {new Date(booking.checkOut).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {/* Right – Payment */}
                <div className="flex flex-col justify-between items-start lg:items-end min-w-[180px]">
                  <div className="text-right space-y-1">
                    <p className="text-xs uppercase text-gray-400 tracking-wide">
                      Total Amount
                    </p>
                    <p className="text-3xl font-bold text-gray-900">
                      ₹{booking.amount}
                    </p>
                    <p className="text-sm text-gray-500">
                      ₹{booking.snapshot.price} / night
                    </p>

                    <span
                      className={`inline-block mt-2 text-xs font-medium px-3 py-1 rounded-full ${
                        booking.payment?.status === "Paid"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {booking.payment?.status || "Unpaid"}
                    </span>
                  </div>

                  {(booking.payment.status === "Unpaid" ||
                    booking.payment.status === "Failed") && (
                    <button className="mt-5 bg-emerald-900 text-white rounded-xl px-6 py-2 text-sm font-medium hover:bg-emerald-800 transition">
                      Make Payment
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBookings;
