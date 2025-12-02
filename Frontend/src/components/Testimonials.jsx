import { FaStar } from "react-icons/fa";

const Testimonials = () => {
  return (
    <>
      <div className="flex flex-col items-center text-center gap-12 py-16 px-6 md:px-12 to-white">
        <h1 className="text-3xl font-semibold max-w-160">
          Don't just take our word for it — here's what our Guests say
        </h1>

        <div className="flex flex-col gap-16  md:flex-row items-center justify-center md:gap-6 mt-12">
          <div className="text-sm w-80 border border-gray-200 pb-6 rounded-lg bg-white shadow-md hover:shadow-xl transition hover:-translate-y-1">
            <div className="flex flex-col items-center px-5 py-4 relative">
              <img
                className="h-24 w-24 absolute -top-14 rounded-full object-cover"
                src="person-1.jpg"
                alt="userImage1"
              />
              <div className="pt-8 text-center">
                <h1 className="text-lg font-medium text-gray-800">
                  Virat Kohli
                </h1>
                <p className="text-gray-800/80">Cricketer</p>
              </div>
            </div>
            <p className="text-gray-500 px-6 text-center">
              ExplorX made my trip to Goa seamless. The curated hotels and quick booking saved me hours!
            </p>
            <div className="flex justify-center pt-4">
              <div className="flex gap-0.5">
                <FaStar className="text-yellow-400"></FaStar>
                <FaStar className="text-yellow-400"></FaStar>
                <FaStar className="text-yellow-400"></FaStar>
                <FaStar className="text-yellow-400"></FaStar>
                <FaStar className="text-yellow-400"></FaStar>
              </div>
            </div>
          </div>

          <div className="text-sm w-80 border border-gray-200 pb-6 rounded-lg bg-white shadow-md hover:shadow-xl transition hover:-translate-y-1">
            <div className="flex flex-col items-center px-5 py-4 relative">
              <img
                className="h-24 w-24 absolute -top-14 rounded-full object-cover object-top"
                src="person-2.jpg"
                alt="userImage2"
              />
              <div className="pt-8 text-center">
                <h1 className="text-lg font-medium text-gray-800">
                  Preity Zinta
                </h1>
                <p className="text-gray-800/80">National Crush </p>
              </div>
            </div>
            <p className="text-gray-500 px-6 text-center">
              Our honeymoon was unforgettable thanks to ExplorX's personalized recommendations and 24/7 support.
            </p>
            <div className="flex justify-center pt-4">
              <div className="flex gap-0.5">
                <FaStar className="text-yellow-400"></FaStar>
                <FaStar className="text-yellow-400"></FaStar>
                <FaStar className="text-yellow-400"></FaStar>
                <FaStar className="text-yellow-400"></FaStar>
                <FaStar className="text-yellow-400"></FaStar>
              </div>
            </div>
          </div>

          <div className="text-sm w-80 border border-gray-200 pb-6 rounded-lg bg-white shadow-md hover:shadow-xl transition hover:-translate-y-1">
            <div className="flex flex-col items-center px-5 py-4 relative">
              <img
                className="h-24 w-24 absolute -top-14 rounded-full object-cover"
                src="person-3.jpg"
                alt="userImage3"
              />
              <div className="pt-8 text-center">
                <h1 className="text-lg font-medium text-gray-800">Iron Man</h1>
                <p className="text-gray-800/80">Mechanic</p>
              </div>
            </div>
            <p className="text-gray-500 px-6 text-center">
              I love how easy it is to find handpicked stays in new cities. Highly recommend ExplorX for solo travelers!
            </p>
            <div className="flex justify-center pt-4">
              <div className="flex gap-0.5">
                <FaStar className="text-yellow-400"></FaStar>
                <FaStar className="text-yellow-400"></FaStar>
                <FaStar className="text-yellow-400"></FaStar>
                <FaStar className="text-yellow-400"></FaStar>
                <FaStar className="text-yellow-400"></FaStar>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center divide-x divide-gray-300">
          <div className="flex -space-x-3 pr-3">
            <img
              src="/person-1.jpg"
              alt="image"
              className="w-12 h-12 rounded-full border-2 border-white hover:-translate-y-1 transition z-1 object-cover"
            />
            <img
              src="person-2.jpg"
              alt="image"
              className="w-12 h-12 rounded-full border-2 border-white hover:-translate-y-1 transition z-2 object-cover"
            />
            <img
              src="person-3.jpg"
              alt="image"
              className="w-12 h-12 rounded-full border-2 border-white hover:-translate-y-1 transition z-3 object-cover"
            />
            <img
              src="person-4.jpg"
              alt="image"
              className="w-12 h-12 rounded-full border-2 border-white hover:-translate-y-1 transition z-4 object-cover"
            />
          </div>
          <div className="pl-3">
            <div className="flex items-center">
              <FaStar className="text-yellow-400"></FaStar>
              <FaStar className="text-yellow-400"></FaStar>
              <FaStar className="text-yellow-400"></FaStar>
              <FaStar className="text-yellow-400"></FaStar>
              <FaStar className="text-yellow-400"></FaStar>

              <p className="text-gray-600 font-medium ml-2">4.8</p>
            </div>
            <p className="text-sm text-gray-500">
              Trusted by{" "}
              <span className="font-medium text-gray-800">10,000+</span> users
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Testimonials;
