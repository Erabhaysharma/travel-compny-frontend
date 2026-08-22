import { facilitiesApi } from "../../api/facilities";
import { useFetch } from "../../hooks/useFetch";
import FacilityItem from "./FacilityItem";
import Spinner from "../common/Spinner";
import "./FacilitiesSection.css";

export default function FacilitiesSection() {
  const { data: facilities, loading, error } = useFetch(() => facilitiesApi.getAll(), []);

  return (
    <section id="facilities" className="facilities container">
      <div className="facilities__header">
        <h2>Travel Made Comfortable</h2>
        <p>
          From a comfortable ride to thoughtful travel support, we take care of the little
          things that make your journey better.
        </p>
      </div>

      {loading ? (
        <div className="facilities__state">
          <Spinner />
        </div>
      ) : error ? (
        <div className="facilities__state">{error}</div>
      ) : !facilities || facilities.length === 0 ? (
        <div className="facilities__state">Facilities will be listed here soon.</div>
      ) : (
        <div className="facilities__grid">
          {facilities.map((facility) => (
            <FacilityItem key={facility.id} facility={facility} />
          ))}
        </div>
      )}
    </section>
  );
}