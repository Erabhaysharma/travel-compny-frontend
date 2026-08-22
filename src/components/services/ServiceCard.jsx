import { buildServiceWhatsAppLink } from "../../utils/whatsapp";
import "./ServiceCard.css";

export default function ServiceCard({ service }) {
  const whatsappLink = buildServiceWhatsAppLink(service.title);

  return (
    <article className="service-card">
      <div
        className="service-card__image"
        style={service.image_url ? { backgroundImage: `url(${service.image_url})` } : undefined}
      >
        {!service.image_url && (
          <div className="service-card__image-fallback">{service.title.charAt(0)}</div>
        )}
      </div>

      <div className="service-card__body">
        <h3>{service.title}</h3>
        {service.description && <p>{service.description}</p>}

        
        <a  href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="service-card__contact"
        >
          Contact
        </a>
      </div>
    </article>
  );
}