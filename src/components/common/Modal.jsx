import { useEffect, useRef } from "react";
import "./Modal.css";

export default function Modal({ open, onClose, title, children }) {
  const dialogRef = useRef(null);
  const onCloseRef = useRef(onClose);

  // Always keep this pointed at the latest onClose, without adding onClose
  // itself as a dependency below -- onClose is a brand new function
  // reference on every parent re-render (e.g. every keystroke in a form
  // inside this modal), and depending on it would re-run the effect --
  // and re-steal focus back onto the dialog -- on every single keystroke.
  useEffect(() => {
    onCloseRef.current = onClose;
  });

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onCloseRef.current();
    };
    document.addEventListener("keydown", handleKeyDown);

    // Lock background scroll while a modal is open
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    dialogRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]); // only open -- NOT onClose, that was the bug

  if (!open) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        tabIndex={-1}
        ref={dialogRef}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose} aria-label="Close">
          &times;
        </button>
        {title && (
          <h3 id="modal-title" className="modal-title">
            {title}
          </h3>
        )}
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
}