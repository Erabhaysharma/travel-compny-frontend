import GalleryImage from "../common/GalleryImage";
import "./PreviousTourCard.css";

export default function PreviousTourCard({ trip }) {
  const images = trip.gallery_images || [];
  const cover = images[0];
  const thumbs = images.slice(1, 5);

  const dateLabel = trip.trip_date
    ? new Date(trip.trip_date).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null;

  return (
    <article className="prev-tour">
      <div className="prev-tour__gallery">
        <div className="prev-tour__cover">
          {cover ? (
            <GalleryImage image={cover} alt={trip.destination_name} />
          ) : (
            <div className="prev-tour__cover-fallback">{trip.destination_name.charAt(0)}</div>
          )}
        </div>
        {thumbs.length > 0 && (
          <div className="prev-tour__thumbs">
            {thumbs.map((img) => (
              <GalleryImage key={img.id} image={img} alt="" />
            ))}
          </div>
        )}
      </div>

      <div className="prev-tour__body">
        <h3>{trip.destination_name}</h3>
        {dateLabel && <span className="prev-tour__date">{dateLabel}</span>}
        {trip.summary && <p>{trip.summary}</p>}
      </div>
    </article>
  );
}