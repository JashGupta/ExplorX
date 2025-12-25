import { IoCalendarOutline } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";

const Hero = () => {
  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="/p1.jpg"
          alt="Background"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/10" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex min-h-screen flex-col justify-center px-4 sm:px-6 md:px-12 text-white">
        <h1 className="max-w-3xl text-3xl font-bold leading-snug sm:text-4xl md:text-6xl">
          Explore more, worry less with ExplorX.
        </h1>

        <p className="mt-4 mb-8 max-w-2xl text-sm sm:text-lg md:text-2xl text-gray-100">
          Plan your dream trip with curated Hotels, exclusive offers, and smooth
          bookings.
        </p>

        {/* Form */}
        <form className="w-full max-w-5xl rounded-xl bg-white/90 p-4 sm:p-6 text-gray-700 shadow-xl">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-5 md:items-end">
            {/* Destination */}
            <div className="col-span-1 md:col-span-2">
              <label className="mb-1 flex items-center gap-2 text-sm font-medium">
                <IoCalendarOutline />
                Destination
              </label>
              <input
                type="text"
                className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-black"
                placeholder="Where are you going?"
              />
            </div>

            {/* Check In */}
            <div>
              <label className="mb-1 flex items-center gap-2 text-sm font-medium">
                <IoCalendarOutline />
                Check in
              </label>
              <input
                type="date"
                className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm outline-none"
              />
            </div>

            {/* Check Out */}
            <div>
              <label className="mb-1 flex items-center gap-2 text-sm font-medium">
                <IoCalendarOutline />
                Check out
              </label>
              <input
                type="date"
                className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm outline-none"
              />
            </div>

            {/* Guests */}
            <div>
              <label className="mb-1 text-sm font-medium">Guests</label>
              <input
                type="number"
                min={1}
                max={4}
                placeholder="1"
                className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm outline-none"
              />
            </div>
          </div>
          {/* Button */}
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-md bg-emerald-950/90 py-3 text-sm font-medium text-white transition hover:bg-emerald-950 md:h-[42px] mt-6"
            >
              <IoIosSearch size={18} />
              Search
            </button>
        </form>
      </div>
    </section>
  );
};

export default Hero;
