import { useState } from "react";
import Modal from "../common/Modal";
import Button from "../common/Button";
import Spinner from "../common/Spinner";
import SuccessState from "../common/SuccessState";
import ContactFields from "./ContactFields";
import { useModal } from "../../context/ModalContext";
import { useContactForm } from "../../hooks/useContactForm";
import { notifyMeApi } from "../../api/notifyMe";

export default function NotifyMeModal() {
  const { activeModal, closeModal, notifyContext } = useModal();
  const isOpen = activeModal === "notify-me";

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [success, setSuccess] = useState(false);

  const { values, errors, handleChange, validate, reset } = useContactForm();

  const handleClose = () => {
    closeModal();
    setTimeout(() => {
      setSubmitError("");
      setSuccess(false);
      reset();
    }, 200);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    setSubmitError("");
    try {
      await notifyMeApi.submit({ trip_id: notifyContext?.tripId ?? null, ...values });
      setSuccess(true);
    } catch (err) {
      setSubmitError(err.message || "Could not submit your request. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal open={isOpen} onClose={handleClose} title={success ? undefined : "Notify Me"}>
      {success ? (
        <SuccessState
          message="Your form submitted successfully, we will notify you."
          onClose={handleClose}
        />
      ) : (
        <form onSubmit={handleSubmit} noValidate>
          <p className="modal-subtext">
            {notifyContext?.tripLabel
              ? `We'll let you know as soon as registration opens for ${notifyContext.tripLabel}.`
              : "We'll let you know as soon as the next trip is announced."}
          </p>

          <ContactFields values={values} errors={errors} onChange={handleChange} />

          {submitError && <p className="modal-form-error">{submitError}</p>}

          <Button type="submit" fullWidth disabled={submitting}>
            {submitting ? <Spinner size={18} /> : "Notify Me"}
          </Button>
        </form>
      )}
    </Modal>
  );
}
