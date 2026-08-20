import { useState } from "react";
import Modal from "../common/Modal";
import Button from "../common/Button";
import Spinner from "../common/Spinner";
import SuccessState from "../common/SuccessState";
import FormField from "../common/FormField";
import ContactFields from "./ContactFields";
import { useModal } from "../../context/ModalContext";
import { useFetch } from "../../hooks/useFetch";
import { useContactForm } from "../../hooks/useContactForm";
import { tripsApi } from "../../api/trips";
import { bookSeatApi } from "../../api/bookSeat";

export default function BookSeatModal() {
  const { activeModal, closeModal, openNotifyMe } = useModal();
  const isOpen = activeModal === "book-seat";

  const { data: trips, loading: loadingTrips } = useFetch(
    () => (isOpen ? tripsApi.getBookableTrips() : Promise.resolve(null)),
    [isOpen]
  );

  const [tripId, setTripId] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [success, setSuccess] = useState(false);

  const { values, errors, handleChange, validate, reset } = useContactForm();

  const handleClose = () => {
    closeModal();
    // reset local state after the close animation has a moment to run
    setTimeout(() => {
      setTripId("");
      setSubmitError("");
      setSuccess(false);
      reset();
    }, 200);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!tripId) {
      setSubmitError("Please select a trip first.");
      return;
    }
    if (!validate()) return;

    setSubmitting(true);
    setSubmitError("");
    try {
      await bookSeatApi.submit({ trip_id: tripId, ...values });
      setSuccess(true);
    } catch (err) {
      setSubmitError(err.message || "Could not submit your request. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const hasTrips = Array.isArray(trips) && trips.length > 0;

  return (
    <Modal open={isOpen} onClose={handleClose} title={success ? undefined : "Book Your Seat"}>
      {success ? (
        <SuccessState
          message="Your seat request has been submitted successfully! Our team will contact you shortly to confirm."
          onClose={handleClose}
        />
      ) : loadingTrips ? (
        <div className="modal-loading">
          <Spinner />
        </div>
      ) : !hasTrips ? (
        <div className="modal-empty-state">
          <p>No next trip is planned right now.</p>
          <button
            type="button"
            className="modal-empty-state__link"
            onClick={() => openNotifyMe(null)}
          >
            Notify me when a new trip is announced →
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate>
          <FormField
            label="Select trip"
            name="trip"
            as="select"
            value={tripId}
            onChange={(e) => setTripId(e.target.value)}
            required
          >
            <option value="" disabled>
              Choose a destination
            </option>
            {trips.map((trip) => (
              <option key={trip.id} value={trip.id}>
                {trip.destination_name} · {trip.category}
              </option>
            ))}
          </FormField>

          <ContactFields values={values} errors={errors} onChange={handleChange} />

          {submitError && <p className="modal-form-error">{submitError}</p>}

          <Button type="submit" fullWidth disabled={submitting}>
            {submitting ? <Spinner size={18} /> : "Book Seat"}
          </Button>
        </form>
      )}
    </Modal>
  );
}
