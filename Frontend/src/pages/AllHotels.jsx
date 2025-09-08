import { useState } from "react";
import hotels from "../data/hotelsData";
import { FaStar } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
const AllHotels = () => {

  const navigate = useNavigate();
  const [openFilters, setOpenFilters] = useState(false);

  return (
    <>
      <div className="min-h-screen text-emerald-950 mx-auto px-6 sm:px-10 lg:px-16 py-10 pt-32">
        {/*Phone Filters */}
        <div className="md:hidden pb-3">
          <div className="flex justify-around items-center border-b border-emerald-950 pb-2 mb-4">
            <h1>Filters</h1>
            <button
              onClick={() => {
                setOpenFilters(!openFilters);
              }}
              className="text-sm hover:text-red-500 md:hidden"
            >
              {openFilters ? "Hide" : "Show"}
            </button>
          </div>

          <div className={`${openFilters ? "h-auto" : "hidden md:block"}`}>
            <div className="mb-6">
              <h3 className="font-light mb-2">Popular filters</h3>
              <div className="space-y-2 text-sm">
                {[
                  "Single Bed",
                  "Family Suite",
                  "Double Bed",
                  "Luxury Room",
                ].map((room) => (
                  <label
                    key={room}
                    className="flex items-center gap-2 font-extralight"
                  >
                    <input type="checkbox" className="accent-black" />
                    {room}
                  </label>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-light mb-2">Price</h3>
              <div className="space-y-2 text-sm">
                {["₹2500 to ₹5000", "₹5000 to ₹8000", "₹8000 to ₹15000"].map(
                  (priceRange) => (
                    <label
                      key={priceRange}
                      className="flex items-center gap-2 font-extralight"
                    >
                      <input type="checkbox" className="accent-black" />
                      {priceRange}
                    </label>
                  )
                )}
              </div>
            </div>

            <div>
              <h3 className="font-light mb-2">Sort By</h3>
              <div className="space-y-2 text-sm">
                {["Price Low to High", "Price High to Low", "Newest First"].map(
                  (sortOption) => (
                    <label
                      key={sortOption}
                      className="flex items-center gap-2 font-extralight"
                    >
                      <input
                        type="radio"
                        name="sortOption"
                        className="accent-black"
                      />
                      {sortOption} 
                    </label>
                  )
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Main */}
        <h1 className="mt-4 text-3xl md:text-4xl font-semibold text-emerald-900 text-center">
          Hotel Rooms
        </h1>
        <div className="flex justify-between flex-col md:flex-row">
          {/* Hotels */}
          <div
          className="flex flex-col gap-8 py-10 md:w-[70%]">
            {hotels.map((hotel, index) => (
              <div
                key={index}
                onClick={()=> {navigate(`/hotels/${hotel._id}`)}}
                className="bg-white md:w-full rounded-xl shadow-md transition flex flex-col md:flex-row hover:scale-102 hover:shadow-xl"
              >
                <img
                  src={hotel.images[0]}
                  alt={hotel.name}
                  className="w-full md:w-1/2 h-60 object-cover rounded-xl"
                />

                <div className="p-5 flex flex-col justify-between w-full">
                  <div>
                    <h2 className="text-2xl font-medium">{hotel.name}</h2>
                    <p className="text-gray-500">{hotel.city}</p>
                    <div className="flex items-center mt-1 gap-1">
                      <IoLocationOutline />
                      <p className="text-gray-600 text-sm text-center">
                        {hotel.address}
                      </p>
                    </div>

                    <div className="flex items-center mt-2">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <FaStar
                          key={index}
                          className={
                            index < hotel.rating
                              ? "text-yellow-500"
                              : "text-gray-300"
                          }
                        />
                      ))}
                      <span className="text-gray-500 text-sm ml-2">
                        {hotel.reviews} reviews
                      </span>
                    </div>

                    <ul className="flex flex-wrap gap-2 mt-3 text-xs text-gray-700">
                      {hotel.amenities.map((a, i) => (
                        <li
                          key={i}
                          className="bg-gray-100 px-2 py-1 rounded-full"
                        >
                          {a}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <span className="text-lg font-bold text-gray-900 mt-4">
                    {hotel.price}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/*Desktop Filters */}
          <div className="p-4 border rounded-md bg-white shadow-sm w-[20%] h-full text-emerald-950 hidden md:block">
            <div className="flex justify-between items-center border-b border-emerald-950 pb-2 mb-4">
              <h2 className="text-lg font-normal">FILTERS</h2>
              <button className="text-sm hover:text-red-500">Clear</button>
            </div>

            <div>
              <div className="mb-6">
                <h3 className="font-light mb-2">Popular filters</h3>
                <div className="space-y-2 text-sm">
                  {[
                    "Single Bed",
                    "Family Suite",
                    "Double Bed",
                    "Luxury Room",
                  ].map((room) => (
                    <label
                      key={room}
                      className="flex items-center gap-2 font-extralight"
                    >
                      <input type="checkbox" className="accent-black" />
                      {room}
                    </label>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-light mb-2">Price</h3>
                <div className="space-y-2 text-sm">
                  {["₹2500 to ₹5000", "₹5000 to ₹8000", "₹8000 to ₹15000"].map(
                    (priceRange) => (
                      <label
                        key={priceRange}
                        className="flex items-center gap-2 font-extralight"
                      >
                        <input type="checkbox" className="accent-black" />
                        {priceRange}
                      </label>
                    )
                  )}
                </div>
              </div>

              <div>
                <h3 className="font-light mb-2">Sort By</h3>
                <div className="space-y-2 text-sm">
                  {[
                    "Price Low to High",
                    "Price High to Low",
                    "Newest First",
                  ].map((sortOption) => (
                    <label
                      key={sortOption}
                      className="flex items-center gap-2 font-extralight"
                    >
                      <input
                        type="radio"
                        name="sortOption"
                        className="accent-black"
                      />
                      {sortOption}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllHotels;
