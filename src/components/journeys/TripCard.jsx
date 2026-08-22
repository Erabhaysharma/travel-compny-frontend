import { useState } from "react";
import Button from "../common/Button";
import TripDetailModal from "./TripDetailModal";
import { useModal } from "../../context/ModalContext";
import { formatPrice, formatDateRange } from "../../utils/format";
import "./TripCard.css";

/** mode: "next" (Book Seat + payment) | "later" (Notify Me) */
export default function TripCard({ trip, mode }) {
  const [detailOpen, setDetailOpen] = useState(false);
  const { openBookSeat, openNotifyMe } = useModal();

  const price = formatPrice(trip.price);
  const dateLabel = formatDateRange(trip.start_date, trip.end_date);
  const isClosed = mode === "next" && trip.registration_status === "closed";

  const handlePrimaryCta = () => {
    if (mode === "later") {
      openNotifyMe({ tripId: trip.id, tripLabel: trip.destination_name });
    } else {
      openBookSeat(trip.id);
    }
  };

  return (
    <>
      <article className="trip-card">
        <div
          className="trip-card__image"
          style={trip.thumbnail_url ? { backgroundImage: `url(${trip.thumbnail_url})` } : undefined}
        >
          {!trip.thumbnail_url && (
            <div className="trip-card__image-fallback">{trip.destination_name.charAt(0)}</div>
          )}
          {price && <span className="trip-card__price-badge">{price}</span>}
          <div className="trip-card__scrim" />

          <div className="trip-card__overlay">
            <span className="trip-card__category">{trip.category}</span>
            <h3 className="trip-card__title">{trip.destination_name}</h3>
            {trip.description && <p className="trip-card__desc">{trip.description}</p>}
            {dateLabel && <p className="trip-card__date">Journey: {dateLabel}</p>}

            <div className="trip-card__actions">
              {isClosed ? (
                <Button variant="secondary" disabled fullWidth>
                  Registration Closed
                </Button>
              ) : (
                <Button variant="primary" onClick={handlePrimaryCta}>
                  {mode === "later" ? "Notify Me" : "Book My Seat"}
                </Button>
              )}
              <Button variant="on-dark" onClick={() => setDetailOpen(true)}>
                Explore
              </Button>
            </div>
          </div>
        </div>
      </article>

      <TripDetailModal trip={trip} mode={mode} open={detailOpen} onClose={() => setDetailOpen(false)} />
    </>
  );
}