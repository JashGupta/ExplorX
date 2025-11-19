import { Link } from "react-router-dom";

const OwnerNavbar = () => {
  return (
    <nav className="fixed top-0 left-0 bg-white/60 border-b-[0.25px] shadow-md border-emerald-700 w-full flex items-center justify-between px-4 md:px-16 lg:px-24 xl:px-20 transition-all duration-500 z-50 text-emerald-900 backdrop-blur-md py-1 md:py-2">
      <Link to="/">
        <img src={"/logo.png"} alt="logo" className="h-16" />
      </Link>

    </nav>
  );
};
export default OwnerNavbar;
