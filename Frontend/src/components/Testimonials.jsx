import { FaStar } from "react-icons/fa";

const Testimonials = () => {
  return (
    <section className="w-full py-14 px-4 sm:px-6 md:px-12">
      {/* Heading */}
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-900">
          Don't just take our word for it — here's what our Guests say
        </h1>
      </div>

      {/* Testimonials Grid */}
      <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {/* Card */}
        <div className="relative rounded-xl bg-white pb-6 pt-14 text-sm shadow-md transition hover:-translate-y-1 hover:shadow-xl">
          <img
            src="/person-1.jpg"
            alt="Virat Kohli"
            className="absolute -top-12 left-1/2 h-24 w-24 -translate-x-1/2 rounded-full object-cover border-4 border-white"
          />
          <div className="px-6 text-center">
            <h3 className="text-lg font-medium text-gray-800">Virat Kohli</h3>
            <p className="text-gray-500">Cricketer</p>
            <p className="mt-4 text-gray-600">
              ExplorX made my trip to Goa seamless. The curated hotels and quick
              booking saved me hours!
            </p>
            <div className="mt-4 flex justify-center gap-1">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} className="text-yellow-400" />
              ))}
            </div>
          </div>
        </div>

        {/* Card */}
        <div className="relative rounded-xl bg-white pb-6 pt-14 text-sm shadow-md transition hover:-translate-y-1 hover:shadow-xl">
          <img
            src="/person-2.jpg"
            alt="Preity Zinta"
            className="absolute -top-12 left-1/2 h-24 w-24 -translate-x-1/2 rounded-full object-cover border-4 border-white"
          />
          <div className="px-6 text-center">
            <h3 className="text-lg font-medium text-gray-800">Preity Zinta</h3>
            <p className="text-gray-500">National Crush</p>
            <p className="mt-4 text-gray-600">
              Our honeymoon was unforgettable thanks to ExplorX's personalized
              recommendations and 24/7 support.
            </p>
            <div className="mt-4 flex justify-center gap-1">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} className="text-yellow-400" />
              ))}
            </div>
          </div>
        </div>

        {/* Card */}
        <div className="relative rounded-xl bg-white pb-6 pt-14 text-sm shadow-md transition hover:-translate-y-1 hover:shadow-xl">
          <img
            src="/person-4.jpg"
            alt="Neeraj Pepsu"
            className="absolute -top-12 left-1/2 h-24 w-24 -translate-x-1/2 rounded-full object-cover border-4 border-white"
          />
          <div className="px-6 text-center">
            <h3 className="text-lg font-medium text-gray-800">Neeraj Pepsu</h3>
            <p className="text-gray-500">Dil me Base</p>
            <p className="mt-4 text-gray-600">
              I love how easy it is to find handpicked stays in new cities. Highly
              recommend ExplorX for solo travelers!
            </p>
            <div className="mt-4 flex justify-center gap-1">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} className="text-yellow-400" />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Trust Footer */}
      <div className="mx-auto mt-14 flex max-w-md flex-col items-center gap-4 sm:flex-row sm:gap-6">
        <div className="flex -space-x-3">
          {["/person-1.jpg", "/person-2.jpg", "/person-3.jpg", "/person-4.jpg"].map(
            (img, i) => (
              <img
                key={i}
                src={img}
                alt="user"
                className="h-12 w-12 rounded-full border-2 border-white object-cover transition hover:-translate-y-1"
              />
            )
          )}
        </div>

        <div className="text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-1">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} className="text-yellow-400" />
            ))}
            <span className="ml-2 font-medium text-gray-700">4.8</span>
          </div>
          <p className="text-sm text-gray-500">
            Trusted by <span className="font-semibold text-gray-800">10,000+</span>{" "}
            users
          </p>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
