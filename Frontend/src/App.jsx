import { Routes, Route, useLocation } from "react-router-dom";
import {Toaster} from "react-hot-toast";
import { useEffect } from "react";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AllHotels from "./pages/AllHotels";
import HotelDetails from "./pages/HotelDetails";
import MyBookings from "./pages/MyBookings";
import RegisterHotel from "./components/RegisterHotel";
import OwnerNavbar from "./components/hotelOwner/OwnerNavbar";
import OwnerDashboard from "./pages/hotelOwner/OwnerDashboard";
import OwnerAddRoom from "./pages/hotelOwner/OwnerAddRoom";
import OwnerListRoom from "./pages/hotelOwner/OwnerListRoom";
import OwnerSidebar from "./components/hotelOwner/OwnerSidebar";
import { useAppContext } from "./context/AppContext";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import EditUserDetailsForm from "./components/EditUserDetailsForm";
import RoomDetails from "./pages/RoomDetails";
import OwnerHotels from "./pages/hotelOwner/OwnerHotels";
import EditHotelDetailsForm from "./components/EditHotelDetailsForm";

function App() {

  const {showLogin, showRegister, showEditUserDetails, showHotelReg, showEditHotelDetails} = useAppContext();
  const location = useLocation();
  const isOwner = location.pathname.startsWith("/owner");

  const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
      });
    }, [pathname]);

    return null;
  };

  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Toaster />
        <ScrollToTop />
        {showHotelReg && <RegisterHotel />}
        {showLogin && <LoginForm />}
        {showRegister && <RegisterForm />}
        {showEditUserDetails && <EditUserDetailsForm />}
        {showEditHotelDetails && <EditHotelDetailsForm />}
        {isOwner ? (
          <div>
            <OwnerNavbar />
            <OwnerSidebar />
          </div>
        ) : (
          <Navbar />
        )}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/hotels" element={<AllHotels />} />
          <Route path="/hotels/:id" element={<HotelDetails />} />
          <Route path="/rooms/:id" element={<RoomDetails />} />
          <Route path="/my-bookings" element={<MyBookings />} />

          <Route path="/owner/dashboard" element={<OwnerDashboard />} />
          <Route path="/owner/my-hotels" element={<OwnerHotels />} />
          <Route path="/owner/add-room" element={<OwnerAddRoom />} />
          <Route path="/owner/list-room" element={<OwnerListRoom />} />
        </Routes>
      </div>
      {!isOwner ?
        <Footer/> : ""
      }
    </>
  );
}

export default App;
