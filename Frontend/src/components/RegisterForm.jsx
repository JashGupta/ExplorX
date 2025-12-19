import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const RegisterForm = () => {
  const { setShowLogin, setShowRegister, axios, setUser, setToken, navigate } =
    useAppContext();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [profilePic, setProfilePic] = useState(null);

  const handleprofilePicChange = (e) => {
    const pfp = e.target.files[0];

    if (!pfp) return;

    if (!pfp.type.startsWith("image/")) {
      toast.error("Only image files allowed.");
      return;
    }
    setProfilePic(pfp);
  };

  const validateForm = () => {
    if (username.length < 3) return "Username must be at least 3 characters.";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return "Enter a valid email address.";

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;
    if (!passwordRegex.test(password))
      return "Password must be 6 characters and include letters & numbers.";

    if (!profilePic) return "Please upload a profile picture.";

    return null;
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const error = validateForm();
    if (error) {
      toast.error(error);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("profilePic", profilePic);

      const { data } = await axios.post("/api/user/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (data.success) {

        localStorage.setItem("token", data.token);
        setToken(data.token);
        setUser(data.user);

        toast.success("Registration Successful");
        setShowRegister(false);
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(
        "Registration Failed: " +
          (error.response?.data?.message || error.message)
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 backdrop-blur-sm pt-20">
      <div className="relative w-[90%] max-w-xl bg-white/40 backdrop-blur-2xl border border-white/30 shadow-2xl rounded-2xl p-6 md:p-10 animate-fadeIn">
        {/* Close Button */}
        <button
          onClick={() => setShowRegister(false)}
          className="absolute top-4 right-4 text-white hover:text-gray-200"
        >
          <IoClose size={26} />
        </button>

        {/* Heading */}
        <h2 className="text-3xl font-bold text-white text-center mb-2 drop-shadow-lg">
          Create Account
        </h2>
        <p className="text-center text-gray-200 mb-8">
          Join us and start exploring amazing stays!
        </p>

        <form onSubmit={submitHandler} className="flex flex-col gap-5">
          {/* Username */}
          <div>
            <label className="text-white text-sm mb-1 block">Username</label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="your_username"
              className="w-full p-3 rounded-md bg-white/40 text-white placeholder-gray-200 
              border border-white/30 focus:ring-2 focus:ring-emerald-300 outline-none"
            />
          </div>

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
          <div className="relative">
            <label className="text-white text-sm mb-1 block">Password</label>

            <input
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="•••••••"
              className="w-full p-3 pr-12 rounded-md bg-white/40 text-white placeholder-gray-200
    border border-white/30 focus:ring-2 focus:ring-emerald-300 outline-none"
            />

            {/* Eye icon */}
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 bottom-[11px] text-white cursor-pointer hover:text-emerald-300 transition"
            >
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>

          {/* profilePic Upload */}
          <div>
            <label className="text-white text-sm mb-1 block">
              Profile Picture
            </label>
            <input
              type="file"
              accept="image/*"
              required
              onChange={handleprofilePicChange}
              className="w-full p-2 rounded-md bg-white/40 text-white 
              border border-white/30 focus:ring-2 focus:ring-emerald-300 outline-none"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full py-3 bg-emerald-600 text-white font-semibold rounded-md 
            hover:bg-emerald-700 transition-all duration-200 shadow-lg"
          >
            Register
          </button>
        </form>

        {/* Login Switch */}
        <p className="mt-4 text-center text-white text-sm">
          Already have an account?{" "}
          <span
            onClick={() => {
              setShowRegister(false);
              setShowLogin(true);
            }}
            className="cursor-pointer text-yellow-300 font-medium hover:underline"
          >
            Login Here
          </span>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
