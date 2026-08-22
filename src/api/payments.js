import { apiClient } from "./client";

export const paymentsApi = {
  /** Server creates the Razorpay order (amount is read from the DB, never from the browser). */
  createOrder: (tripId) => apiClient.post("/payments/create-order", { trip_id: tripId }),
};