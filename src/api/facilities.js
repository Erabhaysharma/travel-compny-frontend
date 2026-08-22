import { apiClient } from "./client";

export const facilitiesApi = {
  getAll: () => apiClient.get("/facilities"),
};