import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const RegisterForm = () => {
  const { setShowEditUserDetails, axios, user, setUser, navigate } =
    useAppContext();

  const [username, setUsername] = useState(user?.username || "");
  const [email, setEmail] = useState(user?.email || "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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
    if (username && username.length < 3) {
      return "Username must be at least 3 characters.";
    }

    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return "Enter a valid email address.";
      }
    }

    if (newPassword) {
      if (!currentPassword) {
        return "Current password is required to change password.";
      }

      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;
      if (!passwordRegex.test(newPassword)) {
        return "Password must be 6+ characters and include letters & numbers.";
      }

      if (newPassword !== confirmPassword) {
        return "Passwords do not match.";
      }
    }

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
      if (username && username !== user.username) {
        formData.append("username", username);
      }
      if (email && email !== user.email) {
        formData.append("email", email);
      }
      if (currentPassword) {
        formData.append("currentPassword", currentPassword);
      }
      if (newPassword) {
        formData.append("newPassword", newPassword);
      }
      if(profilePic) {
        formData.append("profilePic", profilePic);
      }

      const { data } = await axios.put("/api/user/edit", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (data.success) {
        setShowEditUserDetails(false);
        setUser(data.user);

        toast.success("Profile updated successfully");
        setShowEditUserDetails(false);
        navigate("/");
      }
    } catch (error) {
      toast.error(error?.message || "Update failed");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 backdrop-blur-sm pt-20">
      <div className="relative w-[90%] max-w-3xl bg-white/40 backdrop-blur-2xl border border-white/30 shadow-2xl rounded-2xl p-6 md:p-10 animate-fadeIn">
        {/* Close Button */}
        <button
          onClick={() => setShowEditUserDetails(false)}
          className="absolute top-4 right-4 text-white hover:text-gray-200"
        >
          <IoClose size={26} />
        </button>

        {/* Heading */}
        <h2 className="text-3xl font-bold text-white text-center mb-2 drop-shadow-lg">
          Edit User Details
        </h2>
        <p className="text-center text-gray-200 mb-8">
          Update your details to discover stays tailored just for you.
        </p>

        <form onSubmit={submitHandler} className="flex flex-col gap-5">
          {/* Username */}
          <div>
            <label className="text-white text-sm mb-1 block">Username</label>
            <input
              type="text"
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@gmail.com"
              className="w-full p-3 rounded-md bg-white/40 text-white placeholder-gray-200 
              border border-white/30 focus:ring-2 focus:ring-emerald-300 outline-none"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <label className="text-white text-sm mb-1 block">
              Current Password
            </label>

            <input
              type={showPassword ? "text" : "password"}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
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
          <div className="flex gap-4 w-full">
            <div className="relative w-full">
              <label className="text-white text-sm mb-1 block">
                New Password
              </label>

              <input
                type={showPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
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
            <div className="relative w-full">
              <label className="text-white text-sm mb-1 block">
                Confirm Password
              </label>

              <input
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
          </div>

          {/* profilePic Upload */}
          <div>
            <label className="text-white text-sm mb-1 block">
              Profile Picture
            </label>
            <input
              type="file"
              accept="image/*"
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
            Edit Details
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
