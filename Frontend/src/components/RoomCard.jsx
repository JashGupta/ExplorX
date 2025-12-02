/* eslint-disable react/prop-types */
const RoomCard = ({room}) => {
  return (
    <div
      className="flex w-full h-64 rounded-3xl shadow-md overflow-hidden hover:shadow-xl hover:scale-[1.01] transition-all"
    >
      <div className="w-1/3 h-full overflow-hidden">
        <img
          src={room.roomImages[0].url}
          alt={room.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-6 flex flex-col justify-between flex-1">
        <div>
          <h3 className="text-xl text-emerald-950 font-semibold">{room.name}</h3>
          <p className="text-gray-500 text-sm">{room.roomType}</p>

          <p className="text-emerald-950 font-semibold text-lg mt-2">
            {room.price} / night
          </p>

          <div className="flex flex-wrap gap-2 mt-3 text-xs">
            {room.amenities.map((a, i) => (
              <span
                key={i}
                className="px-3 py-1 bg-gray-100 rounded-full text-gray-700 shadow-sm"
              >
                {a}
              </span>
            ))}
          </div>
        </div>

        <button className="bg-emerald-800 text-white py-2 rounded-lg hover:bg-emerald-900 transition">
          Book Now
        </button>
      </div>
    </div>
  );
};

export default RoomCard;
