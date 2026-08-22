import { useNavigate } from "react-router-dom";
import AnimatedRoadScene from "./AnimatedRoadScene";
import Button from "../common/Button";
import { useModal } from "../../context/ModalContext";
import "./Hero.css";

export default function Hero() {
  const { openBookSeat } = useModal();
  const navigate = useNavigate();

  return (
    <section className="hero">
      <AnimatedRoadScene />

      <div className="hero__content container">
        <h1 className="hero__title">A4 Travel &amp; Tours: Explore. Experience. Remember.</h1>
        <p className="hero__subtitle">
          Discover beautiful destinations, comfortable journeys, and unforgettable
          experiences across India.
        </p>

        <div className="hero__actions">
          <Button variant="primary" onClick={() => openBookSeat()}>
            Book Seat
          </Button>
          <Button variant="on-dark" onClick={() => navigate("/destinations")}>
            Explore Destinations
          </Button>
        </div>
      </div>
    </section>
  );
}