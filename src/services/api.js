import axios from "axios";
import {
  getAccessToken,
  setAccessToken,
  getRefreshToken,
  logout,
} from "../store/authStore";
import { refreshTokenAPI } from "../services/auth";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

api.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalReq = err.config;
    if (err.response?.status === 401 && !originalReq._retry) {
      originalReq._retry = true;
      try {
        const refreshToken = getRefreshToken();
        if (!refreshToken) {
          logout();
          window.location.href = "/auth/login";
          return Promise.reject(err);
        }
        const data = await refreshTokenAPI(refreshToken);
        setAccessToken(data.accessToken);
        originalReq.headers["Authorization"] = `Bearer ${data.accessToken}`;
        return api(originalReq);
      } catch {
        logout();
        window.location.href = "/auth/login";
        return Promise.reject(err);
      }
    }
    return Promise.reject(err);
  }
);
