import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const LoginForm = () => {
  const { setShowLogin, setShowRegister, axios, setToken, setUser, navigate } = useAppContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/user/login", {
        email,
        password,
      });

      if (data.success) {

        localStorage.setItem("token", data.token);
        setToken(data.token);
        setUser(data.user);

        setShowLogin(false);
        navigate("/");
        toast.success("Login Successful");

      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Login Failed: " + error.response?.data?.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 backdrop-blur-sm pt-20">
      <div className="relative w-[90%] max-w-xl bg-white/40 backdrop-blur-2xl border border-white/30 shadow-2xl rounded-2xl p-6 md:p-10 animate-fadeIn">

        {/* Close Button */}
        <button
          onClick={() => setShowLogin(false)}
          className="absolute top-4 right-4 text-white hover:text-gray-200"
        >
          <IoClose size={26} />
        </button>

        {/* Heading */}
        <h2 className="text-3xl font-bold text-white text-center mb-2 drop-shadow-lg">
          Welcome Back
        </h2>
        <p className="text-center text-gray-200 mb-8">
          Login to access your account
        </p>

        <form onSubmit={submitHandler} className="flex flex-col gap-5">

          {/* Email */}
          <div>
            <label className="text-white text-sm mb-1 block">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@gmail.com"
              className="w-full p-3 rounded-md bg-white/40 text-white placeholder-gray-200 
              border border-white/30 focus:ring-2 focus:ring-emerald-300 outline-none"
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-white text-sm mb-1 block">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="•••••••"
              className="w-full p-3 rounded-md bg-white/40 text-white placeholder-gray-200
              border border-white/30 focus:ring-2 focus:ring-emerald-300 outline-none"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full py-3 bg-emerald-600 text-white font-semibold rounded-md 
            hover:bg-emerald-700 transition-all duration-200 shadow-lg"
          >
            Login
          </button>
        </form>

        {/* Register Switch */}
        <p className="mt-4 text-center text-white text-sm">
          Don't have an account?{" "}
          <span
            onClick={() => {
                setShowLogin(false);
                setShowRegister(true);
            }
            }
            className="cursor-pointer text-yellow-300 font-medium hover:underline"
          >
            Register Here
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
