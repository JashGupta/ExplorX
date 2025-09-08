import { useParams } from "react-router-dom";
import { useState } from "react";
import rooms from "../data/hotelsData";
import { FaStar } from "react-icons/fa";
import { IoLocationOutline, IoCalendar, IoHomeSharp } from "react-icons/io5";
import { HiBadgeCheck } from "react-icons/hi";
import { FaLocationDot } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";

const RoomDetails = () => {
  const { id } = useParams();
  const room = rooms.find((r) => r._id === id);
  const [mainImage, setMainImage] = useState(room?.images[0]);

  if (!room) {
    return <p className="text-center text-xl mt-10">Room not found.</p>;
  }

  return (
    <div className="mx-auto px-6 sm:px-10 lg:px-16 py-10 pt-32">
      {/* Title + Rating */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-3xl font-bold">{room.name}</h1>
            <p className="text-sm text-gray-600 pt-1">({room.roomType})</p>
            {room.offer && (
              <span className="bg-emerald-100 text-emerald-700 ml-3 px-3 py-1 rounded-full font-medium text-sm">
                {room.offer}
              </span>
            )}
          </div>
          <p className="text-gray-600">{room.city}</p>
          <div className="flex items-center gap-1 mt-1 text-gray-500 text-sm">
            <IoLocationOutline />
            <span>{room.address}</span>
          </div>
        </div>

        <div className="flex items-center mt-2 sm:mt-0">
          {Array.from({ length: 5 }).map((_, index) => (
            <FaStar
              key={index}
              className={
                index < room.rating ? "text-yellow-500" : "text-gray-300"
              }
            />
          ))}
          <span className="text-gray-600 ml-2 text-sm">
            ({room.reviews} reviews)
          </span>
        </div>
      </div>

      {/* Images */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        {/* Main Image */}
        <div className="flex-1 shadow-xl rounded-2xl overflow-hidden">
          <img
            src={mainImage}
            alt={room.name}
            className="w-full h-[400px] object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>

        {/* Thumbnails */}
        <div className="flex gap-4 md:w-1/2 flex-wrap">
          {room.images.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`${room.name} - ${idx}`}
              onClick={() => setMainImage(img)}
              className={`w-[48%] md:h-[190px] h-[160px] object-cover rounded-2xl shadow-md cursor-pointer transition transform
                ${
                  mainImage === img
                    ? "ring-2 ring-emerald-700 scale-105"
                    : "hover:opacity-80 hover:scale-105"
                }`}
            />
          ))}
        </div>
      </div>

      {/* Tagline + Price */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <p className="text-2xl sm:text-3xl font-normal mb-3 sm:mb-0">
          Explore more, worry less with ExplorX.
        </p>
        <span className="text-emerald-950 font-semibold text-2xl">
          {room.price} /night
        </span>
      </div>

      {/* Amenities */}
      <div className="flex flex-wrap gap-2 my-5 mb-12">
        {room.amenities.map((amenity, idx) => (
          <span
            key={idx}
            className="px-4 py-2 bg-gray-100 rounded-full text-gray-700 text-sm shadow-sm transition hover:shadow-md hover:bg-gray-200"
          >
            {amenity}
          </span>
        ))}
      </div>

      {/* Availability Form */}
      <div className="flex justify-center mb-12">
        <form className="bg-white text-gray-500 rounded-lg shadow-md px-6 py-8 flex flex-col md:flex-row gap-4 w-full max-w-[80%] hover:shadow-lg transition">
          <div className="flex flex-col items-start md:pr-6 md:border-r md:border-gray-200 w-full">
            <label
              htmlFor="checkIn"
              className="flex items-center gap-2 font-medium"
            >
              <IoCalendar /> Check-in
            </label>
            <input
              id="checkIn"
              type="date"
              className="rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none w-full"
            />
          </div>

          <div className="flex flex-col items-start md:pr-6 md:border-r md:border-gray-200 w-full">
            <label
              htmlFor="checkOut"
              className="flex items-center gap-2 font-medium"
            >
              <IoCalendar /> Check-out
            </label>
            <input
              id="checkOut"
              type="date"
              className="rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none w-full"
            />
          </div>

          <div className="flex flex-col items-start w-full max-w-[80px] mr-40">
            <label htmlFor="guests" className="font-medium">
              Guests
            </label>
            <input
              id="guests"
              type="number"
              min={1}
              max={4}
              placeholder="1"
              className="rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none w-full"
            />
          </div>

          <button className="flex items-center justify-center gap-1 rounded-md bg-emerald-800 py-3 px-4 text-white cursor-pointer hover:bg-emerald-900 transition w-full">
            Check Availability
          </button>
        </form>
      </div>

      {/* Clean & Safe Stay */}
      <div className="mb-12 py-5 flex justify-center">
        <div className="flex flex-col md:flex-row md:justify-around gap-8 w-full max-w-[80%] text-lg">

          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <IoHomeSharp className="text-emerald-700" />
              <div>
                <p className="font-medium">Clean & Safe Stay</p>
                <p className="text-gray-500 text-sm">
                  A well-maintained and hygienic space just for you.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <HiBadgeCheck className="text-emerald-700" />
              <div>
                <p className="font-medium">Enhanced Cleaning</p>
                <p className="text-gray-500 text-sm">
                  This host follows Staybnb's strict cleaning standards.
                </p>
              </div>
            </div>
          </div>


          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <FaLocationDot className="text-emerald-700" />
              <div>
                <p className="font-medium">Excellent Location</p>
                <p className="text-gray-500 text-sm">
                  90% of guests rated the location 5 stars.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <FaHeart className="text-emerald-700" />
              <div>
                <p className="font-medium">Smooth Check-In</p>
                <p className="text-gray-500 text-sm">
                  100% of guests gave check-in a 5-star rating.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Policies */}
      <div className="mb-12 flex flex-col items-center">
        <h2 className="text-2xl font-semibold mb-3">Policies</h2>
        <ul className="text-sm text-gray-700 flex flex-col gap-1">
          {room.policies.map((policy, idx) => (
            <li key={idx}>• {policy}</li>
          ))}
        </ul>
      </div>

      {/* Host Info */}
      <div className="flex items-center gap-4 p-4 bg-emerald-50 rounded-2xl shadow-sm hover:shadow-md hover:translate-y-0.5 transition">
        <img
          src={room.host.profilePic}
          alt={room.host.name}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div>
          <p className="font-semibold">Hosted by {room.host.name}</p>
          <p className="text-gray-500 text-sm">Your stay organizer</p>
        </div>
        <button className="ml-auto bg-emerald-800 rounded-lg px-3 py-2 text-white hover:bg-emerald-900 transition">
          Contact Now
        </button>
      </div>
    </div>
  );
};

export default RoomDetails;
