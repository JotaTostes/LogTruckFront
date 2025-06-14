import { useMotoristaStore } from "../store/motoristaStore";
import api from "../utils/api";
import { toast } from "react-hot-toast";
import type {
  CreateMotoristaDto,
  Motorista,
  MotoristaCompleto,
  UpdateMotoristaDto,
} from "../types/Motorista";

export const motoristaController = {
  async fetchMotoristas() {
    try {
      const { data } = await api.get<Motorista[]>("/motorista");
      useMotoristaStore.getState().setMotoristas(data);
    } catch (err) {
      toast.error("Erro ao carregar motoristas");
      throw err;
    }
  },

  async fetchMotoristasCompletos() {
    try {
      const { data } = await api.get<MotoristaCompleto[]>(
        "/motorista/motoristas-completos"
      );
      useMotoristaStore.getState().setMotoristasCompletos(data);
    } catch (err) {
      toast.error("Erro ao carregar motoristas completos");
      throw err;
    }
  },

  async addMotorista(motorista: CreateMotoristaDto) {
    try {
      const { data } = await api.post<Motorista>("/motorista", motorista);
      await this.fetchMotoristas(); // Refresh the list
      toast.success("Motorista adicionado com sucesso!");
      return data;
    } catch (err) {
      toast.error("Erro ao adicionar motorista");
      throw err;
    }
  },

  async editMotorista(id: string, motorista: UpdateMotoristaDto) {
    try {
      await api.put(`/motorista/${id}`, motorista);
      await this.fetchMotoristas(); // Refresh the list
      toast.success("Motorista atualizado com sucesso!");
    } catch (err) {
      toast.error("Erro ao editar motorista");
      throw err;
    }
  },

  async deleteMotorista(id: string) {
    try {
      await api.delete(`/motorista/${id}`);
      await this.fetchMotoristas();
      toast.success("Motorista removido com sucesso!");
    } catch (err: any) {
      if (
        err.response &&
        err.response.data &&
        err.response.data.errors &&
        Array.isArray(err.response.data.errors)
      ) {
        err.response.data.errors.forEach((error: string) => toast.error(error));
      } else {
        toast.error("Erro ao remover motorista");
      }
      throw err;
    }
  },
};
