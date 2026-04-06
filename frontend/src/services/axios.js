import axios from "axios";
import { useAuthStore } from "@/features/auth/store/authStore.js";
import { getOrCreateDeviceId } from "@/lib/utils";
// This is your centralized HTTP client.
// ALL API calls go through this instance.

const BASE_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000"
    : "https://nonpatentable-dizzyingly-lavone.ngrok-free.dev";
// const BASE_URL = import.meta.env.MODE === "development" ? "http://api:5000" : "/";
const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // Allows cookies (important for JWT httpOnly)
});
// Injects "Authorization" header automatically
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  // If accessToken exists, attach to header
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  // send device id to backend
  config.headers["x-device-id"] = getOrCreateDeviceId();
  return config;
});
api.interceptors.response.use(
  (response) => response, // If success, just return response

  async (error) => {
    const originalRequest = error.config;
    if (originalRequest?.skipAuthRefresh) {
      return Promise.reject(error);
    }
    // explicit guard for refresh endpoint
    const isRefreshRequest = originalRequest.url?.includes("/auth/refresh");
    if (isRefreshRequest) {
      return Promise.reject(error);
    }
    // If 401 AND request hasn't already retried
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // prevent infinite loop

      try {
        // Call refresh endpoint
        const res = await api.post("/auth/refresh", null, {
          skipAuthRefresh: true,
        });

        const newAccessToken = res.data.accessToken;
        // Save new token in Zustand
        useAuthStore.getState().setAccessToken(newAccessToken);

        // Update header for retry
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        // Retry original request
        return api(originalRequest);
      } catch (refreshError) {
        // Refresh failed → logout
        useAuthStore.getState().logout();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default api;
