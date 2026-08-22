import { apiClient } from "./client";

export const servicesApi = {
  getAll: () => apiClient.get("/services"),
};