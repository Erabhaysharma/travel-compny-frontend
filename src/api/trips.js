import { apiClient } from "./client";

export const tripsApi = {
  /** Trips shown as bookable ("Book Seat" dropdown) — open + happening next. */
  getBookableTrips: () =>
    apiClient.get("/trips", { trip_timing: "next", registration_status: "open" }),

  /** All upcoming trips, for a general listing/cards grid if needed later. */
  getAllTrips: (filters = {}) => apiClient.get("/trips", filters),

  getTrip: (id) => apiClient.get(`/trips/${id}`),
};
