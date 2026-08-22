import Modal from "../common/Modal";
import Button from "../common/Button";
import { useModal } from "../../context/ModalContext";
import { formatPrice, formatDateRange } from "../../utils/format";
import "./TripDetailModal.css";

export default function TripDetailModal({ trip, mode, open, onClose }) {
  const { openBookSeat, openNotifyMe } = useModal();

  const price = formatPrice(trip.price);
  const dateLabel = formatDateRange(trip.start_date, trip.end_date);
  const isClosed = mode === "next" && trip.registration_status === "closed";

  const handleCta = () => {
    onClose();
    if (mode === "later") {
      openNotifyMe({ tripId: trip.id, tripLabel: trip.destination_name });
    } else {
      openBookSeat(trip.id);
    }
  };

  return (
    <Modal open={open} onClose={onClose} title={trip.destination_name}>
      <div className="trip-detail">
        {trip.thumbnail_url && (
          <img src={trip.thumbnail_url} alt={trip.destination_name} className="trip-detail__image" />
        )}

        <div className="trip-detail__meta">
          <span className="trip-detail__tag">{trip.category}</span>
          {dateLabel && <span className="trip-detail__tag">Journey: {dateLabel}</span>}
          {price && <span className="trip-detail__tag trip-detail__tag--price">{price}</span>}
        </div>

        {trip.description && <p className="trip-detail__desc">{trip.description}</p>}

        {isClosed ? (
          <Button variant="secondary" disabled fullWidth>
            Registration Closed
          </Button>
        ) : (
          <Button variant="primary" fullWidth onClick={handleCta}>
            {mode === "later" ? "Notify Me" : "Book My Seat"}
          </Button>
        )}
      </div>
    </Modal>
  );
}