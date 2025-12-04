import { useParams } from "react-router-dom";
import { useState } from "react";

import { FaStar } from "react-icons/fa";
import { IoLocationOutline, IoHomeSharp } from "react-icons/io5";
import { HiBadgeCheck } from "react-icons/hi";
import { FaLocationDot } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";
import RoomCard from "../components/RoomCard";
import { useAppContext } from "../context/AppContext";
import { useEffect } from "react";

const HotelDetails = () => {
  const { id } = useParams();
  const { axios } = useAppContext();

  const [hotel, setHotel] = useState(null);
  const [rooms, setrooms] = useState([]);

  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const { data } = await axios.get(`/api/hotels/${id}`);
        setHotel(data.hotel);
        setrooms(data.rooms);
      } catch (error) {
        console.error("Failed to fetch hotel details:", error);
      }
    }
    fetchHotel();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const [mainImage, setMainImage] = useState(null);

  useEffect(() => {
  if (hotel && hotel.hotelImages?.length > 0) {
    setMainImage(hotel.hotelImages[0]);
  }
}, [hotel]);

  if (!hotel) {
    return <p className="text-center text-xl mt-24">Room not found.</p>;
  }

  return (
    <div className="px-6 sm:px-10 lg:px-20 py-10 pt-28 space-y-14">
      {/* Title Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-4xl text-emerald-950 font-bold tracking-tight">{hotel.name}</h1>
            
            {hotel.offer && (
              <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full font-medium text-xs tracking-wide">
                Upto {hotel.offer} off
              </span>
            )}
          </div>

          <p className="text-gray-600">{hotel.city}</p>

          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <IoLocationOutline />
            <span>{hotel.address}</span>
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, index) => (
            <FaStar
              key={index}
              className={`${
                index < hotel.rating ? "text-yellow-500" : "text-gray-300"
              }`}
            />
          ))}

          <span className="text-gray-600 ml-2 text-sm">
            ({hotel.reviews}+ reviews)
          </span>
        </div>
      </div>

      {/* Images Section */}
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 rounded-3xl overflow-hidden shadow-lg">
          {mainImage && (<img
            src={mainImage?.url}
            alt={hotel?.name}
            className="w-full h-[420px] object-cover transition-transform duration-300 hover:scale-105"
          />
          )}
        </div>

        <div className="flex gap-4 md:w-1/2 flex-wrap">
          {hotel?.hotelImages?.map((img, idx) => (
            <img
              key={idx}
              src={img.url}
              alt={`${hotel.name}-${idx}`}
              onClick={() => setMainImage(img)}
              className={`w-[48%] h-[180px] object-cover rounded-2xl cursor-pointer shadow-md transition-all
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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <p className="text-3xl font-light tracking-wide">
          {hotel.description}
        </p>

        <span className="text-emerald-950 font-semibold text-3xl">
          Starting from ₹{hotel.startingPrice} /night
        </span>
      </div>

      {/* Amenities */}
      <div>
        <h2 className="text-xl font-semibold mb-3">Amenities</h2>
        <div className="flex flex-wrap gap-3">
          {hotel.amenities.map((a, idx) => (
            <span
              key={idx}
              className="px-4 py-2 bg-gray-100 rounded-full shadow-sm text-gray-700 text-sm hover:bg-gray-200 transition"
            >
              {a}
            </span>
          ))}
        </div>
      </div>

      {/* View Room Options */}
      <div className="pt-8 border-t border-gray-300">
        <h2 className="text-2xl font-semibold text-center mb-10">
          View Room Options
        </h2>

        <div className="flex flex-col gap-8">
          {rooms.map((room, idx) => (
            <RoomCard key={idx} room={room}/>
          ))}
        </div>
      </div>

      {/* Policies */}
      <div className="mt-16">
        <h2 className="text-2xl font-semibold mb-6 text-center">Policies</h2>

        <div className="grid sm:grid-cols-3 gap-6  mx-auto">
          {hotel.policies.map((policy, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3 p-4 bg-gray-50 rounded-2xl shadow-sm hover:shadow-md transition"
            >
              <div className="w-3 h-3 bg-emerald-700 rounded-full mt-1"></div>
              <p className="text-gray-700 text-sm leading-relaxed">{policy}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Clean & Comfortable Stay Section */}
      <div className="py-10 bg-gray-50 rounded-3xl shadow-inner">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16">
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <IoHomeSharp className="text-emerald-700 text-xl" />
              <div>
                <p className="font-medium text-lg">Clean & Comfortable Stay</p>
                <p className="text-gray-500 text-sm">
                  A spotless and cozy environment designed for pure comfort.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <HiBadgeCheck className="text-emerald-700 text-xl" />
              <div>
                <p className="font-medium text-lg">Strict Hygiene Protocols</p>
                <p className="text-gray-500 text-sm">
                  Enhanced safety standards for a stress-free stay.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <FaLocationDot className="text-emerald-700 text-xl" />
              <div>
                <p className="font-medium text-lg">Prime Location</p>
                <p className="text-gray-500 text-sm">
                  Centrally located with convenient access to city hotspots.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <FaHeart className="text-emerald-700 text-xl" />
              <div>
                <p className="font-medium text-lg">Hassle-Free Check-In</p>
                <p className="text-gray-500 text-sm">
                  Smooth and fast check-in, loved by previous guests.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Host Info */}
      <div className="flex items-center gap-5 p-5 bg-emerald-50 rounded-3xl shadow-md">
        <img
          src={hotel.owner.profilePic}
          alt={hotel.owner.name}
          className="w-16 h-16 rounded-full object-cover shadow"
        />

        <div>
          <p className="font-semibold text-lg">Hosted by {hotel.owner.username}</p>
          <p className="text-gray-500 font-light text-md">Your stay organizer</p>
          <p className="text-gray-400 font-light text-xs">({hotel.contact})</p>
        </div>

        <button className="ml-auto bg-emerald-800 text-white rounded-lg px-4 py-2 hover:bg-emerald-900 transition">
          Contact Now
        </button>
      </div>
    </div>
  );
};

export default HotelDetails;
