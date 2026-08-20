import { Link } from "react-router-dom";
import "./DestinationCard.css";

export default function DestinationCard({ destination }) {
  const cover = destination.gallery_images?.[0]?.thumbnail_url || destination.gallery_images?.[0]?.url;

  return (
    <Link to={`/destinations/${destination.id}`} className="dest-card">
      <div className="dest-card__image-wrap">
        {cover ? (
          <img src={cover} alt={destination.destination_name} loading="lazy" />
        ) : (
          <div className="dest-card__image-placeholder">{destination.destination_name.charAt(0)}</div>
        )}
      </div>
      <div className="dest-card__body">
        <h3 className="dest-card__title">{destination.destination_name}</h3>
        <p className="dest-card__excerpt">
          {(destination.detail_description || "").slice(0, 110)}
          {destination.detail_description?.length > 110 ? "…" : ""}
        </p>
        <span className="dest-card__link">Read more →</span>
      </div>
    </Link>
  );
}
