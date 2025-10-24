import axios from "axios";
import { useAuthStore } from "../store/authStore";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/v1`,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response &&
      error.response.status === 401 &&
      error.response.data?.message?.toLowerCase().includes("token")
    ) {
      // Remove o token e desloga o usuário
      localStorage.removeItem("token");
      const authStore = useAuthStore.getState();
      authStore.logout?.();

      // Redireciona pro login
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
