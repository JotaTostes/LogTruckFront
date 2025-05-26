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
  login: (email: string, senha: string) => Promise<boolean>;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  usuario: null,
  token: null,

  login: async (email, senha) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/auth/login`,
        { email, senha }
      );

      const { token, usuario } = response.data;

      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      set({ usuario, token });

      localStorage.setItem("token", token);
      localStorage.setItem("usuario", JSON.stringify(usuario));

      return true;
    } catch (error) {
      console.error("Erro ao fazer login", error);
      return false;
    }
  },

  logout: () => {
    set({ usuario: null, token: null });
    delete axios.defaults.headers.common["Authorization"];
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
  },
}));
