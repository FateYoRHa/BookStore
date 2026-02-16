import { create } from "zustand";

// Global state container for authentication.

export const useAuthStore = create((set) => ({
  user: null, // Stores logged in user

  setUser: (user) => set({ user }), // Updates user

  logout: () => set({ user: null }), // Clears user
}));
