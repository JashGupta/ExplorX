import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import { RiMenu3Line } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";
import { FiLogOut, FiEdit, FiHome } from "react-icons/fi";
import { useAppContext } from "../context/AppContext";

const Navbar = () => {
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Hotels", path: "/hotels" },
    { name: "Why Us", path: "/#whyUs" },
    { name: "Contact Us", path: "/#contact" },
  ];
  const userLinks = [{ name: "My Bookings", path: "/my-bookings" }];

  const pagesWithBorder = ["/hotels", "/my-bookings", "/about", "/contact"];

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);

  const location = useLocation();

  const {
    user,
    logout,
    setShowLogin,
    setShowEditUserDetails,
    isOwner,
    navigate,
    setShowHotelReg,
  } = useAppContext();

  useEffect(() => {
    if (location.pathname === "/") {
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 10);
      };
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    } else {
      setIsScrolled(true);
    }
  }, [location.pathname]);

  return (
    <nav
      className={`fixed top-0 left-0 bg-black/10 shadow-xl w-full flex items-center justify-between px-4 md:px-16 lg:px-24 xl:px-20 transition-all duration-500 z-50 ${
        isScrolled
          ? "bg-white/60 text-emerald-900 backdrop-blur-md py-1 md:py-2"
          : "py-2 :py-3 backdrop-blur-xs"
      } ${
        pagesWithBorder.includes(location.pathname)
          ? "border-b border-gray-300"
          : ""
      }`}
    >
      {/* Logo */}
      <Link
        to="/"
        onClick={() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      >
        <img src={"/logo.png"} alt="logo" className="h-16" />
      </Link>

      {/* Desktop Nav */}
      <div className="hidden md:flex items-center gap-4 lg:gap-8">
        {navLinks.map((link, i) => (
          <Link
            key={i}
            to={link.path}
            className={`group flex flex-col gap-0.5 ${
              isScrolled ? "" : "text-white"
            }`}
          >
            {link.name}
          </Link>
        ))}
        {user &&
          userLinks.map((link, i) => (
            <Link
              key={i}
              to={link.path}
              className={`group flex flex-col gap-0.5 ${
                isScrolled ? "" : "text-white"
              }`}
            >
              {link.name}
            </Link>
          ))}

        {user && (
          <button
            className={`border px-4 py-1 text-sm font-light rounded-full cursor-pointer ${
              isScrolled ? "" : "text-white"
            } transition-all`}
            onClick={() => {
              isOwner ? navigate("/owner/dashboard") : setShowHotelReg(true);
            }}
          >
            {isOwner ? "Dashboard" : "List your Hotel"}
          </button>
        )}
      </div>

      {/* Desktop Right */}
      <div className="hidden md:flex items-center gap-4">
        <IoIosSearch className={`text-2xl ${isScrolled ? "" : "text-white"}`} />

        {!user ? (
          <button
            onClick={() => setShowLogin(true)}
            className={`px-8 py-2.5 rounded-full ml-4 transition-all duration-500 ${
              isScrolled
                ? "text-white bg-emerald-950 hover:bg-emerald-950/80"
                : "bg-white text-emerald-950 hover:bg-emerald-50"
            }`}
          >
            Login
          </button>
        ) : (
          <button onClick={() => setOpenDropdown(!openDropdown)}>
            <img
              src={user.profilePic}
              alt="profile"
              className="w-10 h-10 rounded-full object-cover"
            />
          </button>
        )}
        {/* Dropdown */}
        {openDropdown && (
          <div
            className={`absolute right-0 top-0 mt-20 mr-2 w-56 z-50 rounded-2xl
      backdrop-blur-xl shadow-2xl border border-white/10
      transform transition-all duration-200 origin-top-right
      animate-in fade-in zoom-in
      ${
        isScrolled
          ? "bg-emerald-950/80 text-white"
          : "bg-white/90 text-emerald-900"
      }`}
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
          transition-all duration-100
          hover:bg-emerald-900/40"
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
                  w-full px-5 py-3 flex items-center gap-3 transition-all duration-100
                  text-sm font-semibold tracking-wide hover:bg-emerald-900/40
                "
              >
                <FiHome className="text-lg opacity-80" />
                List new Hotel
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

      {/* Mobile Menu Button */}
      <div className="flex items-center gap-3 md:hidden">
        <RiMenu3Line
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`h-5 w-5 ${isScrolled ? "" : "invert"}`}
        />
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 left-0 w-full h-screen bg-white text-base flex flex-col md:hidden items-center justify-center gap-6 font-medium text-gray-800 transition-all duration-500 ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          className="absolute top-8 right-4"
          onClick={() => setIsMenuOpen(false)}
        >
          <IoMdClose className="h-5 w-5" />
        </button>

        {navLinks.map((link, i) => (
          <a key={i} href={link.path} onClick={() => setIsMenuOpen(false)}>
            {link.name}
          </a>
        ))}

        {user && (
          <button
            className="border px-4 py-1 text-sm font-light rounded-full cursor-pointer transition-all"
            onClick={() => {
              isOwner ? navigate("/owner/dashboard") : setShowHotelReg(true);
              setIsMenuOpen(false);
            }}
          >
            {isOwner ? "Dashboard" : "List your Hotel"}
          </button>
        )}

        {!user ? (
          <button
            onClick={() => {
              navigate("/login");
              setIsMenuOpen(false);
            }}
            className="bg-black text-white px-8 py-2.5 rounded-full transition-all duration-500"
          >
            Login
          </button>
        ) : (
          <button
            onClick={() => {
              logout();
              setIsMenuOpen(false);
            }}
            className="bg-black text-white px-8 py-2.5 rounded-full"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
