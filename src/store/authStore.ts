import { create } from "zustand";
import axios from "axios";

interface Usuario {
  id: string;
  nome: string;
  email: string;
  role: string;
}

interface AuthStore {
  usuario: Usuario | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, senha: string) => Promise<boolean>;
  logout: () => void;
  checkAuth: () => boolean;
  initializeAuth: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  usuario: null,
  token: null,
  isAuthenticated: false,

  initializeAuth: () => {
    const token = localStorage.getItem("token");
    const usuario = JSON.parse(localStorage.getItem("usuario") || "null");

    if (token && usuario) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      set({ token, usuario, isAuthenticated: true });
    }
  },

  checkAuth: () => {
    const token = localStorage.getItem("token");
    return !!token;
  },

  login: async (email, senha) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/auth/login`,
        { email, senha }
      );

      const { token, usuario } = response.data;

      if (!token || !usuario) {
        throw new Error("Invalid response data");
      }

      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      set({ usuario, token, isAuthenticated: true });

      localStorage.setItem("token", token);
      localStorage.setItem("usuario", JSON.stringify(usuario));

      return true;
    } catch (error) {
      console.error("Erro ao fazer login", error);
      return false;
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    delete axios.defaults.headers.common["Authorization"];
    set({ usuario: null, token: null, isAuthenticated: false });
  },
}));

useAuthStore.getState().initializeAuth();
