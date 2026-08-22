import { paymentsApi } from "../api/payments";

/**
 * Opens the Razorpay checkout popup for a trip and resolves with the
 * payment fields Razorpay hands back on success. Those fields still get
 * re-verified server-side in POST /book-seat -- this hook only handles
 * the checkout UI, it never marks anything as "paid" itself.
 */
export function useRazorpayCheckout() {
  const payForTrip = ({ tripId, tripName, contact }) => {
    return new Promise((resolve, reject) => {
      if (!window.Razorpay) {
        reject(new Error("Payment could not load. Please refresh and try again."));
        return;
      }

      paymentsApi
        .createOrder(tripId)
        .then((order) => {
          const rzp = new window.Razorpay({
            key: order.key_id,
            amount: order.amount,
            currency: order.currency,
            order_id: order.order_id,
            name: "A4 Travel & Tours",
            description: tripName,
            prefill: {
              name: contact.name,
              email: contact.email,
              contact: contact.phone,
            },
            theme: { color: "#F07818" },
            handler: (response) => {
              resolve({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              });
            },
            modal: {
              ondismiss: () => reject(new Error("Payment was cancelled.")),
            },
          });

          rzp.on("payment.failed", () => reject(new Error("Payment failed. Please try again.")));
          rzp.open();
        })
        .catch(reject);
    });
  };

  return { payForTrip };
}