const ContactUs = () => {
  return (
    <section
      id="contact"
      className="w-full bg-gradient-to-b from-white to-emerald-50 py-16 px-4 sm:px-6 md:px-12"
    >
      {/* Heading */}
      <div className="mx-auto max-w-2xl text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
          Contact <span className="text-green-700">Us!</span>
        </h2>
        <p className="mt-3 text-gray-600 text-sm sm:text-base md:text-lg">
          Have questions or need support? We're here to help you 24/7.
        </p>
      </div>

      {/* Form + Info */}
      <div className="mx-auto flex flex-col gap-10 md:flex-row md:gap-16">
        {/* Contact Form */}
        <form className="flex-1 space-y-5 rounded-2xl bg-white p-6 sm:p-8 shadow-lg">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-1 focus:ring-emerald-500 outline-none"
          />
          <input
            type="email"
            placeholder="Email Address"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-1 focus:ring-emerald-500 outline-none"
          />
          <input
            type="tel"
            placeholder="Phone Number (Optional)"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-1 focus:ring-emerald-500 outline-none"
          />
          <textarea
            rows="4"
            placeholder="Your Message"
            className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 focus:ring-1 focus:ring-emerald-500 outline-none"
          ></textarea>
          <button
            type="submit"
            className="w-full rounded-lg bg-green-800 py-3 text-white font-medium hover:bg-green-900 transition"
          >
            Send Message
          </button>
        </form>

        {/* Contact Info + Map */}
        <div className="flex-1 flex flex-col gap-6">
          {/* Info */}
          <div className="rounded-2xl bg-white p-6 shadow-lg">
            <h3 className="mb-4 text-xl font-semibold text-gray-900">Get in Touch</h3>
            <p className="mb-2 text-gray-600">📍 Chitkara University, Rajpura, Punjab</p>
            <p className="mb-2 text-gray-600">
              📞{" "}
              <a href="tel:8295501601" className="hover:text-emerald-700 transition">
                82955 01601
              </a>
            </p>
            <p className="text-gray-600">
              📧{" "}
              <a href="mailto:jashgupta77@gmail.com" className="hover:text-emerald-700 transition">
                jashgupta77@gmail.com
              </a>
            </p>
          </div>

          {/* Google Map */}
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <iframe
              title="Google Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3427.4605121742284!2d76.6572!3d30.5162!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391028d6af4e65fb%3A0x5d6c49e15c3c3f3f!2sChitkara%20University%2C%20Patiala!5e0!3m2!1sen!2sin!4v1693910100000!5m2!1sen!2sin"
              width="100%"
              height="280"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
