import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,

      login: (userData) => {
        set({
          user: userData,
        });
      },

      logout: () => {
        set({
          user: null,
        });
      },

      isAuthenticated: () => {
        const state = get();
        return !!state.user;
      },
    }),
    {
      name: "auth-storage",
      getStorage: () => localStorage,
    }
  )
);
