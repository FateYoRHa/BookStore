import { create } from "zustand";
import { persist } from "zustand/middleware";

// Global state container for authentication.

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null, // Stores logged in user

      login: (user) => set({ user }), // Updates user

      logout: () => set({ user: null }), // Clears user
    }),
    {
      name: "auth-storage",
    },
  ),
);
