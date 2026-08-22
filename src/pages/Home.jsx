import Hero from "../components/hero/Hero";
import JourneysSection from "../components/journeys/JourneysSection";
import ServicesSection from "../components/services/ServicesSection";
import FacilitiesSection from "../components/facilities/FacilitiesSection";
import "./Home.css";

export default function Home() {
  return (
    <div className="home-sections">
      <Hero />
      <JourneysSection />
      <ServicesSection />
      <FacilitiesSection />
    </div>
  );
}