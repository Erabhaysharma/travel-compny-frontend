import { apiClient } from "./client";

export const bookSeatApi = {
  submit: (payload) => apiClient.post("/book-seat", payload),
};
