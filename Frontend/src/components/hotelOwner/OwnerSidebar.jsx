import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaTachometerAlt, FaPlusSquare, FaList, FaBars, FaTimes } from "react-icons/fa";

const OwnerSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Navbar with Hamburger */}
      <div className="sm:hidden flex items-center justify-between p-4 border-b border-emerald-700 pt-24">
        <h2 className="text-xl font-bold text-emerald-900">Owner Dashborad</h2>
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <nav
        className={`fixed sm:absolute top-0 left-0 h-full w-64 bg-white border-r border-emerald-700 text-emerald-950 pt-24 z-10
        ${isOpen ? "translate-x-0" : "-translate-x-full"} sm:translate-x-0`}
      >
        <div className="flex flex-col">
          <NavLink
            to="/owner/dashboard"

            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-4 hover:bg-emerald-50 hover:text-emerald-800 ${
                isActive ? "bg-emerald-50 text-emerald-900 font-medium border-r-4 border-emerald-800" : ""
              }`
            }
          >
            <FaTachometerAlt className="text-emerald-800" /> Dashboard
          </NavLink>

          <NavLink
            to="/owner/add-room"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-4 hover:bg-emerald-50 hover:text-emerald-800 ${
                isActive ? "bg-emerald-50 text-emerald-900 font-medium border-r-4 border-emerald-800" : ""
              }`
            }
          >
            <FaPlusSquare className="text-emerald-800" /> Add Room
          </NavLink>

          <NavLink
            to="/owner/list-room"
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-4 hover:bg-emerald-50 hover:text-emerald-800 ${
                isActive ? "bg-emerald-50 text-emerald-900 font-medium border-r-4 border-emerald-800" : ""
              }`
            }
          >
            <FaList className="text-emerald-800" /> List Room
          </NavLink>
        </div>
      </nav>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/40 md:hidden"
        />
      )}
    </>
  );
};

export default OwnerSidebar;
