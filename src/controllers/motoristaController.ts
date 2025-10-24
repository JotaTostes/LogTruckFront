import { useMotoristaStore } from "../store/motoristaStore";
import api from "../utils/api";
import { toast } from "react-hot-toast";
import type {
  CreateMotoristaDto,
  Motorista,
  MotoristaCompleto,
  UpdateMotoristaDto,
} from "../types/Motorista";
import type { ApiResponse } from "../types/ApiResponse";

export const motoristaController = {
  async fetchMotoristas() {
    try {
      const { data } = await api.get<ApiResponse<Motorista[]>>("/motorista");

      if (data.success) {
        useMotoristaStore.getState().setMotoristas(data.content || []);
      } else {
        data.errors?.forEach((error) => toast.error(error));
      }
    } catch (err) {
      toast.error("Erro ao carregar motoristas");
      throw err;
    }
  },

  async fetchMotoristasCompletos() {
    try {
      const { data } = await api.get<ApiResponse<MotoristaCompleto[]>>(
        "/motorista/motoristas-completos"
      );

      if (data.success) {
        useMotoristaStore.getState().setMotoristasCompletos(data.content || []);
      } else {
        data.errors?.forEach((error) => toast.error(error));
      }
    } catch (err) {
      toast.error("Erro ao carregar motoristas completos");
      throw err;
    }
  },

  async addMotorista(motorista: CreateMotoristaDto) {
    try {
      const { data } = await api.post<ApiResponse<Motorista>>(
        "/motorista",
        motorista
      );

      if (data.success) {
        await this.fetchMotoristas();
      } else {
        data.errors?.forEach((error) => toast.error(error));
      }
      toast.success("Motorista adicionado com sucesso!");
      return data;
    } catch (err) {
      toast.error("Erro ao adicionar motorista");
      throw err;
    }
  },

  async editMotorista(id: string, motorista: UpdateMotoristaDto) {
    try {
      const { data } = await api.put<ApiResponse<null>>(
        `/motorista/${id}`,
        motorista
      );

      if (data.success) {
        await this.fetchMotoristas();
      } else {
        data.errors?.forEach((error) => toast.error(error));
      }
      toast.success("Motorista atualizado com sucesso!");
    } catch (err) {
      toast.error("Erro ao editar motorista");
      throw err;
    }
  },

  async deleteMotorista(id: string) {
    try {
      const { data } = await api.delete<ApiResponse<null>>(`/motorista/${id}`);

      if (data.success) {
        await this.fetchMotoristasCompletos();
      } else {
        data.errors?.forEach((error) => toast.error(error));
      }
      toast.success("Motorista removido com sucesso!");
    } catch (err: any) {
      toast.error("Erro ao editar motorista");
      throw err;
    }
  },
  async fetchMotoristasDeletados() {
    try {
      const { data } = await api.get<ApiResponse<Motorista[]>>(
        "/motorista/deletados"
      );

      if (data.success) {
        useMotoristaStore.getState().setMotoristasDeletados(data.content || []);
      } else {
        data.errors?.forEach((error) => toast.error(error));
      }
    } catch (err) {
      toast.error("Erro ao carregar motoristas deletados");
      throw err;
    }
  },
  async reativarMotorista(id: string) {
    try {
      const { data } = await api.put<ApiResponse<null>>(
        `/motorista/${id}/reativar`
      );

      if (data.success) {
        await this.fetchMotoristasDeletados();
      } else {
        data.errors?.forEach((error) => toast.error(error));
      }
      toast.success("Motorista reativado com sucesso!");
    } catch (err) {
      toast.error("Erro ao reativar motorista");
      throw err;
    }
  },
};
