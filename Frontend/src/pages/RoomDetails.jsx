import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import { FaStar } from "react-icons/fa";
import { IoCalendarOutline, IoPeopleOutline, IoBed } from "react-icons/io5";
import { MdCancel } from "react-icons/md";

import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const RoomDetails = () => {
  const { id } = useParams();
  const { axios, token } = useAppContext();

  const [room, setRoom] = useState(null);
  const [mainImage, setMainImage] = useState(null);

  // Booking states
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [amount, setAmount] = useState(0);
  const [isAvailable, setIsAvailable] = useState(null);
  const [bookedDates, setBookedDates] = useState([]);

  const checkAvailability = () => {
    if (!room) return;

    if (!checkIn || !checkOut) {
      toast.error("Please select both dates");
      return;
    }

    const start = new Date(checkIn);
    const end = new Date(checkOut);
    console.log("start: " + start + ", end: " + end);

    if (end <= start) {
      toast.error("Check-out must be after check-in");
      return;
    }

    if (guests > room.capacity) {
      toast.error(`Maximum ${room.capacity} guests allowed`);
      return;
    }

    const conflict = bookedDates.some(
      ({ start: bookedStart, end: bookedEnd }) => {
        console.log(
          "bookedStart: " + bookedStart + ", bookedEnd: " + bookedEnd
        );
        return start < bookedEnd && end > bookedStart;
      }
    );

    setIsAvailable(!conflict);
  };

  // Fetch room details
  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const { data } = await axios.get(`/api/rooms/${id}`);
        setRoom(data.room);
        console.log("Raw bookings from backend:", data.room.bookings);

        // Extract unavailable dates
        const unavailableDates = data.room.bookings.map((b) => ({
          start: new Date(b.checkIn),
          end: new Date(b.checkOut),
        }));
        setBookedDates(unavailableDates);
      } catch (error) {
        console.error("Failed to fetch room details:", error);
      }
    };
    fetchRoom();
  }, [id, axios]);

  // Set hero image
  useEffect(() => {
    if (room?.roomImages?.length > 0) {
      setMainImage(room.roomImages[0]);
    }
  }, [room]);

  // Auto-calc booking amount
  useEffect(() => {
    setIsAvailable(null);
    if (checkIn && checkOut) {
      const start = new Date(checkIn);
      const end = new Date(checkOut);

      const diff = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
      if (diff > 0) setAmount(diff * room.price);
      else setAmount(0);
    }
  }, [checkIn, checkOut, room]);

  // Booking handler
  const handleBooking = async () => {
    if (!checkIn || !checkOut)
      return toast.error("Select check-in and check-out dates");

    if (isAvailable != true) {
      toast.error("Please check availability before booking.");
      return;
    }

    try {
      await axios.post(
        "/api/bookings/create-booking",
        {
          hotel: room.hotel._id,
          room: room._id,
          guests,
          amount,
          checkIn,
          checkOut,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Booking successfull!");
      setCheckIn("");
      setCheckOut("");
      setGuests(1);
      setIsAvailable(null);
      setAmount(0);
    } catch (err) {
      console.log(err);
      toast.error("Booking failed. Try again!");
    }
  };

  if (!room)
    return <p className="text-center text-xl mt-24">Room not found.</p>;

  return (
    <div className="px-6 sm:px-10 lg:px-24 py-12 pt-32 space-y-16">
      {/* HERO SECTION */}
      <div className="relative rounded-3xl overflow-hidden shadow-2xl">
        <img src={mainImage?.url} className="w-full h-[480px] object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

        <div className="absolute bottom-8 left-8 text-white space-y-2">
          <h1 className="text-4xl font-extrabold tracking-tight drop-shadow-lg">
            {room.roomType}
          </h1>

          <p className="text-lg opacity-90">
            {room.hotel.address}, {room.hotel.city}
          </p>

          {room.hotel.rating > 0 && room.hotel.reviews > 0 && (
            <div className="flex items-center gap-2">
              {Array.from({ length: 5 }).map((_, index) => (
                <FaStar
                  key={index}
                  className={`${
                    index < room.hotel.rating
                      ? "text-yellow-400"
                      : "text-gray-400"
                  }`}
                />
              ))}
              <span className="text-sm opacity-80">
                {room.hotel.reviews}+ reviews
              </span>
            </div>
          )}
        </div>
      </div>

      {/* IMAGE GALLERY */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {room?.roomImages?.map((img, idx) => (
          <div
            key={idx}
            onClick={() => setMainImage(img)}
            className={`
            cursor-pointer rounded-2xl overflow-hidden shadow-md
            transition-all hover:scale-105 hover:shadow-xl 
            ${mainImage === img ? "ring-2 ring-emerald-600 scale-105" : ""}
          `}
          >
            <img src={img.url} className="w-full h-48 object-cover" />
          </div>
        ))}
      </div>

      {/* DESCRIPTION + PRICE */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-6">
        <p className="text-4xl text-gray-800 leading-relaxed max-w-3xl">
          {room.roomDescription ||
            "Enjoy a luxurious stay with premium facilities and unmatched comfort."}
        </p>

        <div className="text-right">
          <span className="text-4xl font-bold text-emerald-900">
            ₹{room.price}
          </span>
          <p className="text-gray-500 text-sm">per night · includes taxes</p>
        </div>
      </div>

      {/* EXTRA ROOM DETAILS */}
      <div className="border-t-[0.25px] border-emerald-800 pt-8">
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          Room Highlights
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 text-gray-700 text-sm">
          {/* Bed Type */}
          <div className="flex items-center gap-3 p-4 rounded-xl border border-emerald-50 shadow-sm hover:shadow-md transition">
            <IoBed className="text-xl mr-2" />
            <div>
              <p className="font-semibold">Bed Type</p>
              <p className="text-gray-500">
                {room.bedType || "Normal sized Bed"}
              </p>
            </div>
          </div>

          {/* Max Guests */}
          <div className="flex items-center gap-3 p-4 rounded-xl border border-emerald-50 shadow-sm hover:shadow-md transition">
            <IoPeopleOutline className="text-xl mr-2" />
            <div>
              <p className="font-semibold">Max Guests</p>
              <p className="text-gray-500">{room.capacity || 3} Guests</p>
            </div>
          </div>

          {/* Cancellation */}
          <div className="flex items-center gap-3 p-4 rounded-xl border border-emerald-50 shadow-sm hover:shadow-md transition">
            <MdCancel className="text-xl mr-2" />
            <div>
              <p className="font-semibold">Cancellation</p>
              <p className="text-gray-500">Free before 24 hrs</p>
            </div>
          </div>
        </div>
      </div>

      {/* BOOKING CARD */}
      <div className="flex justify-center rounded-3xl bg-gray-50 shadow-md hover:shadow-lg transition">
        <div className="backdrop-blur-lg rounded-xl p-8 w-full space-y-6">
          <h3 className="text-xl font-semibold text-emerald-950">
            Book Your Stay
          </h3>

          <div className="grid sm:grid-cols-3 gap-6">
            {/* Check-In */}
            <div>
              <label className="text-gray-700 text-sm mb-1 flex items-center gap-2">
                <IoCalendarOutline /> Check-in
              </label>
              <input
                type="date"
                value={checkIn}
                min={new Date().toISOString().split("T")[0]}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full rounded-xl border border-gray-300 px-3 py-3 bg-white shadow-sm outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* Check-Out */}
            <div>
              <label className="text-gray-700 text-sm mb-1 flex items-center gap-2">
                <IoCalendarOutline /> Check-out
              </label>
              <input
                type="date"
                value={checkOut}
                min={checkIn || new Date().toISOString().split("T")[0]}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full rounded-xl border border-gray-300 px-3 py-3 bg-white shadow-sm outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* Guests */}
            <div>
              <label className="text-gray-700 text-sm mb-1 flex items-center gap-2">
                <IoPeopleOutline /> Guests
              </label>
              <input
                type="number"
                min={1}
                max={room.capacity}
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="w-full rounded-xl border border-gray-300 px-3 py-3 bg-white shadow-sm outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* ONE BUTTON — CHANGES LOGIC BASED ON STATE */}
          <button
            onClick={isAvailable === true ? handleBooking : checkAvailability}
            disabled={!room.active}
            className={`w-full py-3 rounded-xl font-semibold shadow-lg transition text-white
        ${
          room.active ? isAvailable === true
            ? "bg-emerald-800 hover:bg-emerald-900"
            : "bg-emerald-700 hover:bg-emerald-800" : ""
        } ${!room.active ? "bg-gray-400 cursor-not-allowed" : "cursor-pointer"}
      `}
          >
            {room.active ? isAvailable === true ? "Book Now" : "Check Availability" : "Room Inactive"}
          </button>

          {/* Availability Message */}
          <div className="text-center">
            {isAvailable === true && (
              <p className="text-green-600 font-semibold text-lg">
                ✔ Room is available
              </p>
            )}
            {isAvailable === false && (
              <p className="text-red-600 font-semibold text-lg">
                ✘ Room is unavailable
              </p>
            )}
          </div>

          {/* TOTAL AMOUNT (HIDDEN UNTIL USER CHECKS) */}
          {isAvailable === true && (
            <div className="pt-4 border-t border-gray-200 text-center">
              <p className="text-xl font-semibold text-emerald-900 mb-3">
                Total Amount: ₹{amount}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* AMENITIES */}
      {room.amenities && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Extra Amenities</h2>
          <div className="flex flex-wrap gap-3">
            {room.amenities.map((a, idx) => (
              <span
                key={idx}
                className="px-4 py-2 bg-gray-50 border border-emerald-50 rounded-2xl shadow-sm text-gray-700 text-sm
            hover:shadow-md transition"
              >
                {a}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* HOST CARD */}
      <div className="flex items-center gap-5 p-6 bg-white border border-emerald-50 rounded-3xl shadow-lg hover:shadow-xl transition">
        <img
          src={room.hotel.owner.profilePic}
          className="w-20 h-20 rounded-full object-cover shadow"
        />

        <div>
          <p className="font-bold text-xl">
            Hosted by {room.hotel.owner.username}
          </p>
          <p className="text-gray-500 text-sm">Your verified stay organizer</p>
        </div>

        <button className="ml-auto bg-emerald-800 text-white px-5 py-2 rounded-xl hover:bg-emerald-900 transition">
          Contact Host
        </button>
      </div>
    </div>
  );
};

export default RoomDetails;
