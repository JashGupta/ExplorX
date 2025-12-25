import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ContactUs from "../components/ContactUs";
import FeaturedHotels from "../components/FeaturedHotels";
import Hero from "../components/Hero";
import Testimonials from "../components/Testimonials";
import WhyChooseUs from "../components/WhyChooseUs";

const Home = () => {

  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));

      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, [location]);

  return (
    <>
        <Hero/>
        <FeaturedHotels/>
        <WhyChooseUs/>
        <Testimonials/>
        <ContactUs/> 
    </>
  );
};

export default Home;
