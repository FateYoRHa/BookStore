import { create } from "zustand";
import { persist } from "zustand/middleware";
import api from "@/services/axios";
import { jwtDecode } from "jwt-decode";

// Global state container for authentication.

export const useAuthStore = create(
  persist(
    (set) => ({
      accessToken: null,
      user: null, // Stores logged in user
      customer: null, // Stores customer

      login: async (data) => {
        // accessToken contains user data
        const decoded = jwtDecode(data.accessToken); // decode accesstoken
        set({
          accessToken: data.accessToken,
          user: decoded, // set decoded accessToken as user
        });
        
        const res = await api.get("/core/customers/me");
        set({
          customer: res.data,
        });
      },
      logout: () =>
        set({
          accessToken: null, // Clears accessToken
          user: null, // Clears user
          customer: null, // clear customer
        }),
      
      setCustomer: async () => {
        const res = await api.get("/core/customers/me");
        set({
          customer: res.data,
        });
      },

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
