import axios from "axios";
import { useAuthStore } from "@/features/auth/store/authStore.js";
// This is your centralized HTTP client.
// ALL API calls go through this instance.

const BASE_URL =
  import.meta.env.MODE === "development" ? "http://localhost:5000" : "/";
// const BASE_URL = import.meta.env.MODE === "development" ? "http://api:5000" : "/";
const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // Allows cookies (important for JWT httpOnly)
});
// Injects "Authorization" header automatically
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().user?.accessToken;
  // If accessToken exists, attach to header
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
api.interceptors.response.use(
  (response) => response, // If success, just return response

  async (error) => {
    const originalRequest = error.config;

    // If 401 AND request hasn't already retried
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // prevent infinite loop

      try {
        // Call refresh endpoint
        const res = await axios.post(
          "http://localhost:5000/api/auth/refresh",
          {},
          { withCredentials: true },
        );

        const newAccessToken = res?.data?.accessToken;

        // Save new token in Zustand
        useAuthStore.getState().user(newAccessToken);

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
