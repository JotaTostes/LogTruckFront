import { useUsuarioStore } from "../store/usuarioStore";
import api from "../utils/api";
import { toast } from "react-hot-toast";
import type {
  CreateUsuarioDto,
  UpdateUsuarioDto,
  Usuario,
  UsuarioDto,
} from "../types/Usuario";
import type { ApiResponse } from "../types/ApiResponse";

export const usuarioController = {
  async fetchUsuarios() {
    try {
      const { data } = await api.get<ApiResponse<Usuario[]>>("/usuario");

      if (data.success) {
        useUsuarioStore.getState().setUsuarios(data.content || []);
      } else {
        data.errors?.forEach((error) => toast.error(error));
      }
    } catch (err) {
      toast.error("Erro ao carregar usuários");
      throw err;
    }
  },

  async fetchUsuariosMotoristas() {
    try {
      const { data } = await api.get<ApiResponse<UsuarioDto[]>>(
        "/usuario/usuarios-motoristas"
      );
      if (data.success) {
        useUsuarioStore.getState().setUsuariosMotoristas(data.content || []);
      } else {
        data.errors?.forEach((error) => toast.error(error));
      }
    } catch (err) {
      toast.error("Erro ao carregar usuários motoristas");
      throw err;
    }
  },

  async addUsuario(usuario: CreateUsuarioDto) {
    try {
      const roleMap = { Administrador: 1, Motorista: 2, Operador: 3 };
      const usuarioParaEnviar = {
        ...usuario,
        role:
          typeof usuario.role === "string"
            ? roleMap[usuario.role as keyof typeof roleMap]
            : usuario.role,
      };

      const { data } = await api.post<ApiResponse<Usuario>>(
        "/usuario",
        usuarioParaEnviar
      );

      if (data.success) {
        await this.fetchUsuarios();
      } else {
        data.errors?.forEach((error) => toast.error(error));
      }
      toast.success("Usuário adicionado com sucesso!");
      return data;
    } catch (err) {
      toast.error("Erro ao adicionar usuário");
      throw err;
    }
  },

  async editUsuario(id: string, usuario: UpdateUsuarioDto) {
    try {
      const { data } = await api.put<ApiResponse<null>>(
        `/usuario/${id}`,
        usuario
      );

      if (data.success) {
        await this.fetchUsuarios();
      } else {
        data.errors?.forEach((error) => toast.error(error));
      }
      toast.success("Usuário editado com sucesso!");
    } catch (err) {
      toast.error("Erro ao editar usuário");
      throw err;
    }
  },

  async deleteUsuario(id: string) {
    try {
      const { data } = await api.delete<ApiResponse<null>>(`/usuario/${id}`);

      if (data.success) {
        await this.fetchUsuarios();
      } else {
        data.errors?.forEach((error) => toast.error(error));
      }
      toast.success("Usuário removido com sucesso!");
    } catch (err) {
      toast.error("Erro ao remover usuário");
      throw err;
    }
  },
};
