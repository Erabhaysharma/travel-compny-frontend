import "./SuccessState.css";

export default function SuccessState({ message, onClose }) {
  return (
    <div className="success-state">
      <div className="success-state__icon" aria-hidden="true">
        ✓
      </div>
      <p className="success-state__message">{message}</p>
      <button className="success-state__close" onClick={onClose}>
        Done
      </button>
    </div>
  );
}
