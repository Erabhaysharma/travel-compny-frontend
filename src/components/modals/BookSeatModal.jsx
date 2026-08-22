import { useEffect, useState } from "react";
import Modal from "../common/Modal";
import Button from "../common/Button";
import Spinner from "../common/Spinner";
import SuccessState from "../common/SuccessState";
import FormField from "../common/FormField";
import ContactFields from "./ContactFields";
import { useModal } from "../../context/ModalContext";
import { useFetch } from "../../hooks/useFetch";
import { useContactForm } from "../../hooks/useContactForm";
import { useRazorpayCheckout } from "../../hooks/useRazorpayCheckout";
import { tripsApi } from "../../api/trips";
import { bookSeatApi } from "../../api/bookSeat";
import { formatPrice } from "../../utils/format";

export default function BookSeatModal() {
  const { activeModal, closeModal, openNotifyMe, bookSeatContext } = useModal();
  const isOpen = activeModal === "book-seat";
  const preselectedTripId = bookSeatContext?.tripId ?? null;

  // Flow A: opened generically (e.g. from the hero) -- fetch the list of
  // bookable trips and let the user pick one from a dropdown.
  const { data: trips, loading: loadingTrips } = useFetch(
    () => (isOpen && !preselectedTripId ? tripsApi.getBookableTrips() : Promise.resolve(null)),
    [isOpen, preselectedTripId]
  );

  // Flow B: opened from a specific trip's "Book Seat" button -- skip the
  // dropdown entirely and just load that one trip's details.
  const { data: preselectedTrip, loading: loadingPreselected } = useFetch(
    () => (isOpen && preselectedTripId ? tripsApi.getTrip(preselectedTripId) : Promise.resolve(null)),
    [isOpen, preselectedTripId]
  );

  const [tripId, setTripId] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [paying, setPaying] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [success, setSuccess] = useState(false);
  const [paidAmount, setPaidAmount] = useState(null);

  const { values, errors, handleChange, validate, reset } = useContactForm();
  const { payForTrip } = useRazorpayCheckout();

  useEffect(() => {
    if (preselectedTripId) setTripId(preselectedTripId);
  }, [preselectedTripId]);

  const handleClose = () => {
    closeModal();
    setTimeout(() => {
      setTripId("");
      setSubmitError("");
      setSuccess(false);
      setPaidAmount(null);
      reset();
    }, 200);
  };

  // The trip object backing whichever flow is active, so we know its price.
  const selectedTrip =
    preselectedTrip || (Array.isArray(trips) ? trips.find((t) => t.id === tripId) : null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!tripId) {
      setSubmitError("Please select a trip first.");
      return;
    }
    if (!validate()) return;

    setSubmitError("");
    const price = selectedTrip?.price ? Number(selectedTrip.price) : 0;

    try {
      let paymentFields = {};

      if (price > 0) {
        setPaying(true);
        paymentFields = await payForTrip({
          tripId,
          tripName: selectedTrip.destination_name,
          contact: values,
        });
        setPaying(false);
        setPaidAmount(price);
      }

      setSubmitting(true);
      await bookSeatApi.submit({ trip_id: tripId, ...values, ...paymentFields });
      setSuccess(true);
    } catch (err) {
      setSubmitError(err.message || "Could not submit your request. Please try again.");
    } finally {
      setPaying(false);
      setSubmitting(false);
    }
  };

  const hasTrips = Array.isArray(trips) && trips.length > 0;
  const loading = preselectedTripId ? loadingPreselected : loadingTrips;
  const price = selectedTrip?.price ? Number(selectedTrip.price) : 0;
  const busy = paying || submitting;

    return (
    <Modal open={isOpen} onClose={handleClose} title={success ? undefined : "Book Your Seat"}>
      {success ? (
        <SuccessState
          message={
            paidAmount
              ? `Payment of ${formatPrice(paidAmount)} received and your seat is confirmed! Our team will reach out with the trip details shortly.`
              : "Your seat request has been submitted successfully! Our team will contact you shortly to confirm."
          }
          onClose={handleClose}
        />
      ) : loading ? (
        <div className="modal-loading">
          <Spinner />
        </div>
      ) : preselectedTripId && !preselectedTrip ? (
        // Preselected trip failed to load (bad id, network error, etc.)
        <div className="modal-empty-state">
          <p>We couldn't load this trip's details. Please close this and try again.</p>
        </div>
      ) : !preselectedTripId && !hasTrips ? (
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
          {preselectedTripId && preselectedTrip ? (
            <div className="book-seat__trip-summary">
              <span className="book-seat__trip-name">{preselectedTrip.destination_name}</span>
              <span className="book-seat__trip-category">{preselectedTrip.category}</span>
            </div>
          ) : (
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
              {(trips || []).map((trip) => (
                <option key={trip.id} value={trip.id}>
                  {trip.destination_name} · {trip.category}
                </option>
              ))}
            </FormField>
          )}

          <ContactFields values={values} errors={errors} onChange={handleChange} />

          {price > 0 && (
            <div className="book-seat__price-row">
              <span>Amount payable</span>
              <strong>{formatPrice(price)}</strong>
            </div>
          )}

          {submitError && <p className="modal-form-error">{submitError}</p>}

          <Button type="submit" fullWidth disabled={busy}>
            {busy ? (
              <Spinner size={18} />
            ) : price > 0 ? (
              `Pay ${formatPrice(price)} & Book Seat`
            ) : (
              "Book Seat"
            )}
          </Button>
        </form>
      )}
    </Modal>
  );
}