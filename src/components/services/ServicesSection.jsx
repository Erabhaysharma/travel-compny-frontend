import { servicesApi } from "../../api/services";
import { useFetch } from "../../hooks/useFetch";
import ServiceCard from "./ServiceCard";
import Spinner from "../common/Spinner";
import "./ServicesSection.css";

export default function ServicesSection() {
  const { data: services, loading, error } = useFetch(() => servicesApi.getAll(), []);

  return (
    <section id="services" className="services container">
      <div className="services__header">
        <h2>More Than Just Travel</h2>
        <p>
          From private adventures to group journeys, A4 Travel &amp; Tours provides
          comfortable and reliable travel solutions for every occasion.
        </p>
      </div>

      {loading ? (
        <div className="services__state">
          <Spinner />
        </div>
      ) : error ? (
        <div className="services__state">{error}</div>
      ) : !services || services.length === 0 ? (
        <div className="services__state">Services will be listed here soon.</div>
      ) : (
        <div className="services__grid">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      )}
    </section>
  );
}