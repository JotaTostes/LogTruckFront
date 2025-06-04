import { create } from "zustand";
import api from "../utils/api";
import { toast } from "react-hot-toast";

type RoleUsuario = "Administrador" | "Operador" | "Motorista";

export interface Usuario {
  id: string;
  nome: string;
  email: string;
  cpf: string;
  role: number;
  ativo: boolean;
  criadoEm: string;
  atualizadoEm: string;
  senha: string;
}

interface UsuarioStore {
  usuarios: Usuario[];
  usuariosMotoristas: Usuario[];
  carregarUsuarios: () => Promise<void>;
  carregarUsuariosMotoristas: () => Promise<void>;
  adicionarUsuario: (
    usuario: Omit<Usuario, "id" | "criadoEm" | "atualizadoEm">
  ) => Promise<void>;
  removerUsuario: (id: string) => Promise<void>;
  editarUsuario: (id: string, usuario: Usuario) => Promise<void>;
}

export const useUsuarioStore = create<UsuarioStore>((set, get) => ({
  usuarios: [],
  usuariosMotoristas: [],
  carregarUsuarios: async () => {
    try {
      const { data } = await api.get<Usuario[]>("/usuario");
      set({ usuarios: data });
    } catch (err) {
      toast.error("Erro ao carregar usuários");
    }
  },
  carregarUsuariosMotoristas: async () => {
    try {
      const { data } = await api.get<Usuario[]>("/usuario/usuarios-motoristas");
      set({ usuariosMotoristas: data });
    } catch (err) {
      toast.error("Erro ao carregar usuários motoristas");
    }
  },
  adicionarUsuario: async (novoUsuario) => {
    try {
      // Se vier como string, converta para número (caso ainda não tenha sido convertido no form)
      const roleMap = { Administrador: 1, Motorista: 2, Operador: 3 };
      const usuarioParaEnviar = {
        ...novoUsuario,
        role:
          typeof novoUsuario.role === "string"
            ? roleMap[novoUsuario.role as keyof typeof roleMap]
            : novoUsuario.role,
      };

      const { data } = await api.post<Usuario>("/usuario", usuarioParaEnviar);
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
    await api.put(`usuario/${id}`, usuario);
    await useUsuarioStore.getState().carregarUsuarios();
  },
}));
