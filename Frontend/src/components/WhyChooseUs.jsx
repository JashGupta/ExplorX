
const WhyChooseUs = () => {
  return (
    <>
      <div id="whyUs" className="w-full py-16 px-6 md:px-12 from-white flex flex-col">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
            Why Choose <span className="text-green-700">Us?</span>
          </h2>
          <p className="text-gray-600 mt-2 text-base md:text-lg">
            We go the extra mile to make your travel experience smooth,
            affordable, and unforgettable.
          </p>
        </div>

        <div className="mt-10 flex flex-col items-center md:flex-row gap-8">
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition hover:-translate-y-1 w-full">
            <div className="text-5xl">💸</div>
            <h3 className="text-xl font-semibold mt-4">Best Price Guarantee</h3>
            <p className="text-gray-500 mt-2 text-sm">
              Get unbeatable deals on premium hotels and stays across top
              destinations.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-2xl transition hover:-translate-y-1 w-full">
            <div className="text-5xl">🏨</div>
            <h3 className="text-xl font-semibold mt-4">Handpicked Hotels</h3>
            <p className="text-gray-500 mt-2 text-sm">
              Every property is carefully selected for comfort, safety, and
              quality.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition hover:-translate-y-1 w-full">
            <div className="text-5xl">📞</div>
            <h3 className="text-xl font-semibold mt-4">
              24/7 Customer Support
            </h3>
            <p className="text-gray-500 mt-2 text-sm">
              Travel with peace of mind — we're here whenever you need us.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition hover:-translate-y-1 w-full">
            <div className="text-5xl">⚡</div>
            <h3 className="text-xl font-semibold mt-4">Quick & Easy Booking</h3>
            <p className="text-gray-500 mt-2 text-sm">
              A seamless booking experience designed to save you time and
              effort.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default WhyChooseUs;
