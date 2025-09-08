import ContactUs from "../components/ContactUs";
import FeaturedDestinations from "../components/FeaturedDestinations";
import Hero from "../components/Hero";
import Testimonials from "../components/Testimonials";
import WhyChooseUs from "../components/WhyChooseUs";

const Home = () => {
  return (
    <>
        <Hero/>
        <FeaturedDestinations/>
        <WhyChooseUs/>
        <Testimonials/>
        <ContactUs/> 
    </>
  );
};

export default Home;
