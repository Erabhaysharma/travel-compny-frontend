import { createContext, useContext, useState, useCallback, useMemo } from "react";

const ModalContext = createContext(null);

/**
 * Any component, anywhere in the tree, can call useModal() to open the
 * Book Seat or Notify Me modal without prop-drilling or re-implementing
 * the same modal logic on every page.
 */
export function ModalProvider({ children }) {
  // activeModal: null | "book-seat" | "notify-me"
  const [activeModal, setActiveModal] = useState(null);
  // Optional preselected trip when opened from a specific trip card
  const [bookSeatContext, setBookSeatContext] = useState(null);
  // Optional context passed to Notify Me when opened for a specific trip
  const [notifyContext, setNotifyContext] = useState(null);

  const openBookSeat = useCallback((tripId = null) => {
    setBookSeatContext(tripId ? { tripId } : null);
    setActiveModal("book-seat");
  }, []);

  const openNotifyMe = useCallback((context = null) => {
    // context: { tripId, tripLabel } or null for a general "notify me about upcoming trips"
    setNotifyContext(context);
    setActiveModal("notify-me");
  }, []);

  const closeModal = useCallback(() => {
    setActiveModal(null);
    setBookSeatContext(null);
    setNotifyContext(null);
  }, []);

  const value = useMemo(
    () => ({ activeModal, bookSeatContext, notifyContext, openBookSeat, openNotifyMe, closeModal }),
    [activeModal, bookSeatContext, notifyContext, openBookSeat, openNotifyMe, closeModal]
  );

  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>;
}

export function useModal() {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error("useModal must be used inside a <ModalProvider>");
  return ctx;
}