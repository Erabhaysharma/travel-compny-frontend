import { apiClient } from "./client";

export const notifyMeApi = {
  submit: (payload) => apiClient.post("/notify-me", payload),
};
