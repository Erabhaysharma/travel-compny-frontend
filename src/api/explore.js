import { apiClient } from "./client";

export const exploreApi = {
  getAll: () => apiClient.get("/explore"),
  getOne: (id) => apiClient.get(`/explore/${id}`),
};
