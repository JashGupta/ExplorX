import { useState } from "react";
import { Link } from "react-router-dom";
import { FiLogOut, FiEdit, FiHome } from "react-icons/fi";
import { useAppContext } from "../../context/AppContext";

const OwnerNavbar = () => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const {
    user,
    logout,
    setShowEditUserDetails,
    setShowHotelReg,
  } = useAppContext();

  return (
    <nav className="fixed top-0 left-0 bg-white/60 shadow-md  w-full flex items-center justify-between px-4 md:px-16 lg:px-24 xl:px-20 transition-all duration-500 z-50 text-emerald-900 backdrop-blur-md py-1 md:py-2">
      <Link to="/">
        <img src={"/logo.png"} alt="logo" className="h-16" />
      </Link>

      {/* Desktop Right */}
      <div className="hidden md:flex items-center gap-4">
        <button onClick={() => setOpenDropdown(!openDropdown)}>
          <img
            src={user?.profilePic}
            alt="profile"
            className="w-10 h-10 rounded-full object-cover"
          />
        </button>
        {/* Dropdown */}
        {openDropdown && (
          <div
            className="absolute right-0 top-0 mt-20 mr-2 w-56 z-50 rounded-2xl
            backdrop-blur-xl shadow-2xl border border-white/10
            transform transition-all duration-200 origin-top-right
            animate-in fade-in zoom-in bg-emerald-950/90 text-white"
          >
            {/* User Info */}
            <div className="px-5 py-4 border-b border-emerald-700/20">
              <p className="text-sm font-semibold tracking-wide truncate">
                {user?.username}
              </p>
              <p className="text-xs opacity-70 truncate mt-0.5">
                {user?.email}
              </p>
            </div>

            {/* Actions */}
            <div className="py-2">
              <button
                onClick={() => {
                  setOpenDropdown(false);
                  setShowEditUserDetails(true);
                }}
                className="w-full px-5 py-3 flex items-center gap-3 text-sm font-medium
                transition-all duration-200
                hover:bg-emerald-900"
              >
                <FiEdit className="text-lg opacity-80" />
                Edit Profile
              </button>

              <button
                onClick={() => {
                  setOpenDropdown(false);
                  setShowHotelReg(true);
                }}
                className="
    w-full px-5 py-3 flex items-center gap-3
    text-sm font-semibold tracking-wide
    hover:bg-emerald-900
  "
              >
                <FiHome className="text-lg opacity-80"/>
                  Add Hotel
              </button>

              <button
                onClick={() => {
                  setOpenDropdown(false);
                  logout();
                }}
                className="w-full px-5 py-3 flex items-center gap-3 text-sm font-medium
                text-red-500 transition-all duration-200 border-t border-red-700/20 mt-2
                hover:bg-red-500/10"
              >
                <FiLogOut className="text-lg" />
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
export default OwnerNavbar;
