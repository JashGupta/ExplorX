import { Link } from "react-router-dom";
import HotelCard from "./HotelCard";
import { useAppContext } from "../context/AppContext";
import { useEffect, useState } from "react";

const FeaturedHotels = () => {
  const { axios } = useAppContext();
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const { data } = await axios.get("/api/hotels/get-hotels");
        setHotels(data.hotels || []);
      } catch (error) {
        console.error("Failed to fetch hotels:", error);
      }
    };
    fetchHotels();
  }, [axios]);

  if (!hotels || hotels.length === 0) {
    return (
      <p className="text-center text-base sm:text-xl mt-24 text-gray-500">
        No featured destinations available.
      </p>
    );
  }

  return (
    <section className="w-full bg-gradient-to-b from-emerald-50 to-white">
      <div className=" mx-auto px-4 sm:px-6 md:px-10 py-12 md:py-16">

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-emerald-900">
            Featured Hotels
          </h1>
          <p className="text-sm sm:text-base text-gray-600 mt-2">
            Handpicked stays for your perfect getaway.
          </p>
        </div>

        {/* Scrollable Hotels */}
        <div
          className="
            flex gap-6
            overflow-x-auto scroll-smooth scrollbar-hide
            snap-x snap-mandatory
          "
        >
          {hotels.map((hotel, index) => (
            <div
              key={index}
              className="
                min-w-[260px]
                sm:min-w-[300px]
                lg:min-w-[320px]
                snap-start
              "
            >
              <HotelCard hotel={hotel} />
            </div>
          ))}
        </div>

        {/* Button BELOW & AT END */}
        <div className="sm:mt-4 flex justify-end">
          <Link
            to="/hotels"
            className="px-5 py-2 rounded-md border border-gray-300
              text-sm text-emerald-800 hover:bg-emerald-50 transition"
          >
            View all hotels
          </Link>
        </div>

      </div>
    </section>
  );
};

export default FeaturedHotels;
