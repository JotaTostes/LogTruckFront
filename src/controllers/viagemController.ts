import { useViagemStore } from "../store/viagemStore";
import api from "../utils/api";
import { toast } from "react-hot-toast";
import type {
  CreateViagemDto,
  UpdateViagemDto,
  ViagemCompletas,
} from "../types/Viagem";

export const viagemController = {
  async fetchViagensCompletas() {
    try {
      const { data } = await api.get<ViagemCompletas[]>("/viagem/completa");
      useViagemStore.getState().setViagensCompletas(data);
    } catch (err) {
      toast.error("Erro ao carregar viagens completas");
      throw err;
    }
  },

  async addViagem(viagem: CreateViagemDto) {
    try {
      await api.post("/viagem", viagem);
      await this.fetchViagensCompletas();
      toast.success("Viagem criada com sucesso!");
    } catch (err) {
      toast.error("Erro ao criar viagem");
      throw err;
    }
  },

  async editViagem(id: string, viagem: UpdateViagemDto) {
    try {
      await api.put(`/viagem/${id}`, viagem);
      await this.fetchViagensCompletas();
      toast.success("Viagem atualizada com sucesso!");
    } catch (err) {
      toast.error("Erro ao atualizar viagem");
      throw err;
    }
  },

  async deleteViagem(id: string) {
    try {
      await api.delete(`/viagem/${id}`);
      await this.fetchViagensCompletas();
      toast.success("Viagem removida com sucesso!");
    } catch (err) {
      toast.error("Erro ao remover viagem");
      throw err;
    }
  },

  async updateViagemStatus(id: string, status: number) {
    try {
      await api.put(`/viagem/${id}/status/${status}`);
      useViagemStore.getState().updateViagemStatus(id, status);
      toast.success("Status da viagem atualizado com sucesso!");
    } catch (err: any) {
      if (
        err.response &&
        err.response.data &&
        err.response.data.errors &&
        Array.isArray(err.response.data.errors)
      ) {
        err.response.data.errors.forEach((error: string) => toast.error(error));
      } else {
        toast.error("Erro ao atualizar status da viagem");
      }
      throw err;
    }
  },
};
