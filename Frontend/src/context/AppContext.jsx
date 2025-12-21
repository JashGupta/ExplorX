import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

const AppContext = createContext();

// eslint-disable-next-line react/prop-types
export const AppProvider = ({ children }) => {
  const currency = import.meta.env.VITE_CURRENCY || "₹";
  const navigate = useNavigate();

  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);
  const [isOwner, setIsOwner] = useState(false);

  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showEditUserDetails, setShowEditUserDetails] = useState(false);

  const [showHotelReg, setShowHotelReg] = useState(false);

  const [searchedCities, setSearchedCities] = useState([]);

  /** ✅ Attach Token Automatically **/
  useEffect(() => {
    axios.interceptors.request.use(function (config) {
      const token = localStorage.getItem("token");
      if (token) config.headers.Authorization = `Bearer ${token}`;
      return config;
    });
  }, [token]);

  /** ✅ Fetch User If Token Exists **/
  const fetchUser = async () => {
    if (!token) {
    return;
  }

    try {
      const { data } = await axios.get("/api/user");
      
      if (data.success) {
        
        setUser(data.user);
        setIsOwner(data.user.role === "hotelOwner");
        setSearchedCities(data.user.recentSearchedCities || []);
      }
    } catch (error) {
        console.log("error", error);
        
      toast.error("Session expired. Please login again.", error);
      logout();
    }
  };

  useEffect(() => {
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  /** ✅ Logout **/
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    navigate("/");
  };

  const value = {
    currency,
    navigate,
    axios,

    token,
    setToken,

    user,
    setUser,

    logout,

    showLogin,
    setShowLogin,

    showRegister,
    setShowRegister,

    showEditUserDetails,
    setShowEditUserDetails,

    showHotelReg,
    setShowHotelReg,

    isOwner,
    setIsOwner,

    searchedCities,
    setSearchedCities,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAppContext = () => useContext(AppContext);
