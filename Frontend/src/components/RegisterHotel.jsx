import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { useAppContext } from "../context/AppContext";

const RegisterHotel = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const {setShowHotelReg} = useAppContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Hotel Registered:", formData);
    alert("Hotel registered successfully ✅");
  };

  return (
    <div className="fixed z-10 flex w-full h-full justify-center items-center backdrop-blur-sm bg-black/30">
      <div className="flex flex-col md:flex-row h-auto rounded-lg overflow-hidden shadow-md my-6 md:w-[70%] relative">

        <button
          className="absolute md:top-4 right-4 top-26 text-gray-600 hover:text-black"
          onClick={() => {setShowHotelReg(false)}}
        >
          <IoClose size={24}/>
        </button>

        <div className="md:w-1/2 w-full">
          <img
            src="/hotel-3.jpg"
            alt="Register Hotel"
            className="w-full h-full object-cover"
          />
        </div>


        <div className="md:w-1/2 w-full flex items-center justify-center bg-white p-6">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-sm flex flex-col gap-3"
          >
            <h2 className="text-xl text-center font-bold text-gray-800">
              Register Your Hotel
            </h2>
            <p className="text-gray-500 text-center mb-3 text-sm">
              Add your hotel and reach thousands of travelers.
            </p>

            <div className="flex flex-col gap-1">
              <label htmlFor="name" className="text-sm font-medium">
                Hotel Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Hotel Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="border rounded-md p-2 text-sm focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="phone" className="text-sm font-medium">
                Phone
              </label>
              <input
                type="text"
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="border rounded-md p-2 text-sm focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="address" className="text-sm font-medium">
                Address
              </label>
              <input
                type="text"
                name="address"
                placeholder="Hotel Address"
                value={formData.address}
                onChange={handleChange}
                required
                className="border rounded-md p-2 text-sm focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="city" className="text-sm font-medium">
                City
              </label>
              <select
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
                className="border rounded-md p-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="">Select a city</option>
                <option value="Haryana">Haryana</option>
                <option value="New York">New York</option>
                <option value="Himachal">Himachal</option>
                <option value="Punjab">Punjab</option>
              </select>
            </div>

            <button
              type="submit"
              className="bg-blue-600 text-white py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition mt-4"
            >
              Register Hotel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterHotel;
