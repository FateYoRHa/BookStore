import { create } from "zustand";
import { persist } from "zustand/middleware";
import { jwtDecode } from "jwt-decode";

// Global state container for authentication.

export const useAuthStore = create(
  persist(
    (set) => ({
      accessToken: null,
      user: null, // Stores logged in user

      login: (data) => {
        // accessToken contains user data
        const decoded = jwtDecode(data.accessToken); // decode accesstoken
        set({
          accessToken: data.accessToken,
          user: decoded, // set decoded accessToken as user
        });
      },
      logout: () =>
        set({
          accessToken: null, // Clears accessToken
          user: null, // Clears user
        }),

      setAccessToken: (token) => {
        const decoded = jwtDecode(token); // decode accesstoken
        set({ accessToken: token, user: decoded });
      },
    }),
    {
      name: "auth-storage",
    },
  ),
);
