import "./FacilityItem.css";

export default function FacilityItem({ facility }) {
  return (
    <div className="facility-item">
      <div className="facility-item__image">
        {facility.image_url ? (
          <img src={facility.image_url} alt={facility.title} loading="lazy" />
        ) : (
          <div className="facility-item__image-fallback">{facility.title.charAt(0)}</div>
        )}
      </div>
      <div className="facility-item__text">
        <h3>{facility.title}</h3>
        {facility.description && <p>{facility.description}</p>}
      </div>
    </div>
  );
}