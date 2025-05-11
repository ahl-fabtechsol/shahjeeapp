"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      user: null,

      setUser: (user) => set({ user }),
      setTokens: (accessToken, refreshToken) =>
        set({ accessToken, refreshToken }),
      clearTokens: () => set({ accessToken: null, refreshToken: null }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: "auth-storage",
      getStorage: () => localStorage,
    }
  )
);

export const getAccessToken = () => useAuthStore.getState().accessToken;
export const getRefreshToken = () => useAuthStore.getState().refreshToken;
export const getUser = () => useAuthStore.getState().user;

export const setUser = (user) => useAuthStore.getState().setUser(user);
export const setTokens = (at, rt) => useAuthStore.getState().setTokens(at, rt);
export const clearTokens = () => useAuthStore.getState().clearTokens();
export const clearUser = () => useAuthStore.getState().clearUser();
export const setAccessToken = (token) =>
  useAuthStore.setState({ accessToken: token });
