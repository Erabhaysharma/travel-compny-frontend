import { useParams, Link } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { exploreApi } from "../api/explore";
import Spinner from "../components/common/Spinner";
import Button from "../components/common/Button";
import GalleryImage from "../components/common/GalleryImage";
import { useModal } from "../context/ModalContext";
import "./DestinationDetail.css";

export default function DestinationDetail() {
  const { id } = useParams();
  const { openNotifyMe } = useModal();
  const { data: destination, loading, error } = useFetch(() => exploreApi.getOne(id), [id]);

  if (loading) {
    return (
      <div className="destination-detail__state">
        <Spinner size={30} />
      </div>
    );
  }

  if (error || !destination) {
    return (
      <div className="destination-detail__state">
        <p>We couldn&apos;t find that destination.</p>
        <Link to="/destinations" className="destination-detail__back">
          ← Back to all destinations
        </Link>
      </div>
    );
  }

  const paragraphs = (destination.detail_description || "").split(/\n+/).filter(Boolean);

  return (
    <article className="destination-detail">
      <div className="container destination-detail__inner">
        <Link to="/destinations" className="destination-detail__back">
          ← Back to all destinations
        </Link>

        <h1 className="destination-detail__title">{destination.destination_name}</h1>

        <div className="destination-detail__content">
          {paragraphs.length > 0 ? (
            paragraphs.map((para, i) => <p key={i}>{para}</p>)
          ) : (
            <p>No description has been added for this destination yet.</p>
          )}
        </div>

        {destination.gallery_images?.length > 0 && (
          <div className="destination-detail__gallery">
            {destination.gallery_images.map((img) => (
              <div className="destination-detail__gallery-item" key={img.id || img.url}>
                <GalleryImage image={img} alt={img.name || destination.destination_name} />
              </div>
            ))}
          </div>
        )}

        <div className="destination-detail__cta">
          <p>Want to be the first to know when a trip like this is announced?</p>
          <Button
            onClick={() =>
              openNotifyMe({ tripId: null, tripLabel: destination.destination_name })
            }
          >
            Notify Me
          </Button>
        </div>
      </div>
    </article>
  );
}