import { Routes, Route, useLocation } from "react-router-dom";
import {Toaster} from "react-hot-toast";
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
import RoomDetails from "./pages/RoomDetails";

function App() {
  const location = useLocation();
  const isOwner = location.pathname.startsWith("/owner");
  const {showLogin, showRegister, showHotelReg} = useAppContext();

  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Toaster />
        {showHotelReg && <RegisterHotel />}
        {showLogin && <LoginForm />}
        {showRegister && <RegisterForm />}
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
