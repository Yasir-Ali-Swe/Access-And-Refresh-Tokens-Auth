import axios from "axios";
import store from "../store/store";
import { setAccessToken, logout } from "../features/auth/authSlice";

const URL = "http://localhost:3000/api";

const api = axios.create({
  baseURL: URL,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = store.getState().auth.accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const res = await axios.post(
          "http://localhost:3000/api/auth/refresh",
          {},
          { withCredentials: true },
        );
        store.dispatch(setAccessToken(res.data?.accessToken));
        originalRequest.headers.Authorization = `Bearer ${res.data?.accessToken}`;
        return api(originalRequest);
      } catch (err) {
        store.dispatch(logout());
        window.location.href = "/auth/login";
      }
    }
    return Promise.reject(error);
  },
);

export default api;
