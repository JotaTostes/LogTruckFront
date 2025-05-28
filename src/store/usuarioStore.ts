import { create } from "zustand";
import axios from "axios";
import api from "../utils/api";
import { toast } from "react-hot-toast";

type RoleUsuario = "Administrador" | "Operador" | "Motorista";

export interface Usuario {
  id: string;
  nome: string;
  email: string;
  cpf: string;
  role: RoleUsuario;
  ativo: boolean;
  criadoEm: string;
  atualizadoEm: string;
  senhaHash: string;
}

interface UsuarioStore {
  usuarios: Usuario[];
  carregarUsuarios: () => Promise<void>;
  adicionarUsuario: (
    usuario: Omit<Usuario, "id" | "criadoEm" | "atualizadoEm">
  ) => Promise<void>;
  removerUsuario: (id: string) => Promise<void>;
  editarUsuario: (id: string, usuario: Usuario) => Promise<void>;
}

export const useUsuarioStore = create<UsuarioStore>((set, get) => ({
  usuarios: [],
  carregarUsuarios: async () => {
    try {
      const { data } = await api.get<Usuario[]>("/usuario");
      set({ usuarios: data });
    } catch (err) {
      toast.error("Erro ao carregar usuários");
    }
  },
  adicionarUsuario: async (novoUsuario) => {
    try {
      const { data } = await api.post<Usuario>("/usuario", novoUsuario);
      set((state) => ({ usuarios: [data, ...state.usuarios] }));
      toast.success("Usuário adicionado com sucesso!");
    } catch (err) {
      toast.error("Erro ao adicionar usuário");
    }
  },
  removerUsuario: async (id: string) => {
    try {
      await api.delete(`/usuario/${id}`);
      set((state) => ({
        usuarios: state.usuarios.filter((u) => u.id !== id),
      }));
      toast.success("Usuário removido com sucesso!");
    } catch (err) {
      toast.error("Erro ao remover usuário");
    }
  },
  editarUsuario: async (id, usuario) => {
    await axios.put(`usuario/${id}`, usuario);
    await useUsuarioStore.getState().carregarUsuarios();
  },
}));
