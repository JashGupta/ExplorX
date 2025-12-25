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
          const { data } = await axios.get('/api/hotels/get-hotels');
          setHotels(data.hotels || []);
        } catch (error) {
          console.error("Failed to fetch hotels:", error);
        }
      }
      fetchHotels();
    }, [axios]);

    if (!hotels || hotels.length === 0) {
      return <p className="text-center text-xl mt-24">No featured destinations available.</p>;
    }
  
  return (

    <>
      <div className="w-full py-10 px-6 md:py-16 md:px-10 flex flex-col bg-linear-to-b from-emerald-50 to-white">
        <h1 className="text-3xl font-bold">Featured Hotels</h1>
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
          className="px-4 py-2 rounded-md border text-sm border-gray-300 cursor-pointer hover:bg-green-50 self-end text-emerald-800"
        >
          <button>view all Hotels</button>
        </Link>
      </div>
    </>
  );
};

export default FeaturedHotels;
