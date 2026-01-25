import hero from "../assets/hero.png";
// add a pkt
import Features from "../components/landingPageComponents/Features";
import FinalCTA from "../components/landingPageComponents/FinalCTA";
import Hero from "../components/landingPageComponents/Hero";
import LandingPFooter from "../components/landingPageComponents/LandingPFooter";
import LandingPNavbar from "../components/landingPageComponents/LandingPNavbar";
import Testimonial from "../components/landingPageComponents/Testimonies";

const HomePage = () => {
  return (
    <div>
      <div className="min-h-screen bg-background-light dark:bg-background-dark text-[#0c1d1c] dark:text-[#f8fcfc]">
        <LandingPNavbar />
        <main>
          <Hero />
          <Features />
          {/* You can add Testimonial and Footer components similarly */}
          <Testimonial />
          <FinalCTA />
          <LandingPFooter />
        </main>
      </div>
    </div>
  );
};

export default HomePage;
