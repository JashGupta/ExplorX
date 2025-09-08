import ownerDashboardData from "../../data/ownerDashboardData";
import { FaBed, FaClipboardList } from "react-icons/fa";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";

const OwnerDashboard = () => {
  const { stats, recentBookings } = ownerDashboardData;

  return (
    <div className="p-2 sm:pt-24 sm:pl-64">
      {/* Header */}
      <div className="p-4 sm:p-6 text-emerald-950">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2">Dashboard</h1>
        <p className="text-emerald-900 max-w-full sm:max-w-[65%] text-sm sm:text-base">
          Monitor your room listings, track bookings and analyze revenue - all
          in one place. Stay updated with real-time insights to ensure smooth
          operations.
        </p>
      </div>

      {/* Stats */}
      <div className="flex flex-wrap gap-4 pt-3 px-4 sm:px-6 text-emerald-900 w-full">
        <div className="bg-emerald-100 p-4 rounded-xl shadow flex items-center gap-2 w-full  sm:w-[48%] lg:w-auto">
          <FaBed className="text-lg" />
          <p>Total Rooms: {stats.totalRooms}</p>
        </div>
        <div className="bg-emerald-100 p-4 rounded-xl shadow flex items-center gap-2 w-full sm:w-[48%] lg:w-auto">
          <FaBed className="text-lg" />
          <p>Available Rooms: {stats.availableRooms}</p>
        </div>
        <div className="bg-emerald-100 p-4 rounded-xl shadow flex items-center gap-2 w-full sm:w-[48%] lg:w-auto">
          <FaClipboardList className="text-lg" />
          <p>Total Bookings: {stats.totalBookings}</p>
        </div>
        <div className="bg-emerald-100 p-4 rounded-xl shadow flex items-center gap-2 w-full sm:w-[48%] lg:w-auto">
          <RiMoneyRupeeCircleFill className="text-lg" />
          <p>Revenue: {stats.revenue}</p>
        </div>
      </div>

      {/* Recent Bookings */}
      <div className="flex flex-col gap-6 pt-16 px-4 sm:px-6 text-emerald-950">
        <h2 className="text-xl sm:text-2xl font-semibold">Recent Bookings</h2>
        <div className="bg-white shadow-lg rounded-lg max-h-80 overflow-y-auto overflow-x-auto">
          <table className="w-full text-left min-w-[600px]">
            <thead className="sticky top-0 z-10">
              <tr className="bg-emerald-50 text-gray-600 text-xs sm:text-sm uppercase">
                <th className="py-3 sm:py-4 px-4 sm:px-6">Guest</th>
                <th className="py-3 sm:py-4 px-4 sm:px-6">Room</th>
                <th className="py-3 sm:py-4 px-4 sm:px-6">Check-in</th>
                <th className="py-3 sm:py-4 px-4 sm:px-6">Check-out</th>
                <th className="py-3 sm:py-4 px-4 sm:px-6">Total Amount</th>
                <th className="py-3 sm:py-4 px-4 sm:px-6">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentBookings.map((booking, index) => (
                <tr
                  key={index}
                  className="transition-all hover:shadow-md hover:bg-emerald-50 border-b-[0.5px] border-emerald-600"
                >
                  <td className="py-4 px-4 sm:px-6 font-semibold text-gray-800 text-sm sm:text-base">
                    {booking.guest}
                  </td>
                  <td className="px-4 sm:px-6 text-gray-700">{booking.room}</td>
                  <td className="px-4 sm:px-6 text-gray-600">{booking.checkIn}</td>
                  <td className="px-4 sm:px-6 text-gray-600">{booking.checkOut}</td>
                  <td className="px-4 sm:px-6 font-bold text-gray-900">
                    {booking.totalAmount}
                  </td>
                  <td className="px-4 sm:px-6">
                    <span
                      className={`px-3 py-1.5 rounded-3xl text-xs sm:text-sm font-semibold shadow-sm
                        ${
                          booking.status === "Confirmed"
                            ? "bg-green-100 text-green-700"
                            : booking.status === "Pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                    >
                      {booking.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OwnerDashboard;
