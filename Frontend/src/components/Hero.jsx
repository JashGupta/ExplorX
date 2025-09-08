import { IoCalendarOutline } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";

const Hero = () => {
  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="/p1.jpg"
          alt="Background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-start justify-center text-white px-4 md:px-12">
        <h1 className="font-bold text-3xl sm:text-4xl md:text-6xl leading-snug">
          Explore more, worry less with ExplorX.
        </h1>
        <p className="text-base sm:text-lg md:text-2xl mt-3 mb-8 max-w-2xl">
          Plan your dream trip with curated destinations, exclusive offers, and smooth bookings.
        </p>

        {/* Form */}
        <form className="bg-white text-gray-700 rounded-lg px-6 py-4 flex flex-col  items-center md:flex-row gap-5 w-full max-w-4xl shadow-lg">
          {/* Destination */}
          <div className="w-full md:w-auto">
            <div className="flex items-center gap-2">
              <IoCalendarOutline />
              <label htmlFor="destinationInput">Destination</label>
            </div>
            <input
              list="destinations"
              id="destinationInput"
              type="text"
              className="w-full rounded border border-gray-200 px-3 py-2 mt-1 text-sm outline-none"
              placeholder="Type here"
              required
            />
          </div>

          {/* Check in */}
          <div className="w-full md:w-auto">
            <div className="flex items-center gap-2">
              <IoCalendarOutline />
              <label htmlFor="checkIn">Check in</label>
            </div>
            <input
              id="checkIn"
              type="date"
              className="w-full md:w-40 rounded border border-gray-200 px-3 py-2 mt-1 text-sm outline-none"
            />
          </div>

          {/* Check out */}
          <div className="w-full md:w-auto">
            <div className="flex items-center gap-2">
              <IoCalendarOutline />
              <label htmlFor="checkOut">Check out</label>
            </div>
            <input
              id="checkOut"
              type="date"
              className="w-full md:w-40 rounded border border-gray-200 px-3 py-2 mt-1 text-sm outline-none"
            />
          </div>

          {/* Guests */}
          <div className="w-full md:w-auto flex flex-col">
            <label htmlFor="guests">Guests</label>
            <input
              min={1}
              max={4}
              id="guests"
              type="number"
              className="w-full md:w-20 rounded border border-gray-200 px-3 py-2 mt-1 text-sm outline-none"
              placeholder="0"
            />
          </div>

          {/* Button */}
          <button className="flex items-center justify-center gap-2 rounded-md bg-black py-2 px-3 text-white text-sm font-medium w-full lg:w-32 lg:h-12">
            <IoIosSearch />
            <span>Search</span>
          </button>
        </form>
      </div>
    </section>
  );
};

export default Hero;
