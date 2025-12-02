import { Link } from "react-router-dom";
import hotels from "../data/hotelsData";
import HotelCard from "./HotelCard";

const FeaturedDestinations = () => {
  return (
    <>
      <div className="w-full py-10 px-6 md:py-16 md:px-10 flex flex-col bg-linear-to-b from-emerald-50 to-white">
        <h1 className="text-3xl font-bold">Featured Destinations</h1>
        <p className="text-sm md:text-base text-gray-600">
          Handpicked stays for your perfect getaway.
        </p>
        <div className="scrollbar-hide flex flex-nowrap gap-6 md:gap-8 pt-6 md:pt-10 overflow-x-auto overflow-y-hidden scroll-smooth scrollbar-hide">
          {hotels.map((hotel, index) => (
            <HotelCard key={index} hotel={hotel} />
          ))}
        </div>
        <Link
          to={"/hotels"}
          className="px-4 py-2 rounded-md border text-sm border-gray-300 cursor-pointer hover:bg-green-50 mt-5 md:mt-8 self-end"
        >
          <button>view all Destinations</button>
        </Link>
      </div>
    </>
  );
};

export default FeaturedDestinations;
