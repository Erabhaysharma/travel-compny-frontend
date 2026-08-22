import { apiClient } from "./client";

export const previousTripsApi = {
  getAll: () => apiClient.get("/previous-trips"),
  getOne: (id) => apiClient.get(`/previous-trips/${id}`),
};