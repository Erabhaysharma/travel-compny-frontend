import { apiClient } from "./client";

export const tripsApi = {
  /** Trips shown as bookable ("Book Seat" dropdown) — open + happening next. */
  getBookableTrips: () =>
    apiClient.get("/trips", { trip_timing: "next", registration_status: "open" }),

  /** All trips for a given timing -- used by the Next Tour / Planned Tours tabs. */
  getByTiming: (timing) => apiClient.get("/trips", { trip_timing: timing }),

  /** All upcoming trips, for a general listing/cards grid if needed later. */
  getAllTrips: (filters = {}) => apiClient.get("/trips", filters),

  getTrip: (id) => apiClient.get(`/trips/${id}`),
};