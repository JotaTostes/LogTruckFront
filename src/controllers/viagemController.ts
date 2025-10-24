import type { ApiResponse } from "../types/ApiResponse";
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
      const { data } = await api.get<ApiResponse<ViagemCompletas[]>>(
        "/viagem/completa"
      );

      if (data.success) {
        useViagemStore.getState().setViagensCompletas(data.content || []);
      } else {
        data.errors?.forEach((error) => toast.error(error));
      }
    } catch (err: any) {
      toast.error("Erro ao carregar caminhões");
      throw err;
    }
  },

  async addViagem(viagem: CreateViagemDto) {
    try {
      const { data } = await api.post<ApiResponse<null>>("/viagem", viagem);

      if (data.success) {
        await this.fetchViagensCompletas();
      } else {
        data.errors?.forEach((error) => toast.error(error));
      }
      toast.success("Viagem criada com sucesso!");
    } catch (err: any) {
      toast.error("Erro ao carregar caminhões");
      throw err;
    }
  },

  async editViagem(id: string, viagem: UpdateViagemDto) {
    try {
      const { data } = await api.put<ApiResponse<null>>(
        `/viagem/${id}`,
        viagem
      );

      if (data.success) {
        await this.fetchViagensCompletas();
      } else {
        data.errors?.forEach((error) => toast.error(error));
      }
      toast.success("Viagem atualizada com sucesso!");
    } catch (err) {
      toast.error("Erro ao atualizar viagem");
      throw err;
    }
  },

  async deleteViagem(id: string) {
    try {
      const { data } = await api.delete<ApiResponse<null>>(`/viagem/${id}`);

      if (data.success) {
        await this.fetchViagensCompletas();
      } else {
        data.errors?.forEach((error) => toast.error(error));
      }
      toast.success("Viagem removida com sucesso!");
    } catch (err) {
      toast.error("Erro ao remover viagem");
      throw err;
    }
  },

  async updateViagemStatus(id: string, status: number) {
    try {
      const { data } = await api.put<ApiResponse<null>>(
        `/viagem/${id}/status/${status}`
      );

      if (data.success) {
        useViagemStore.getState().updateViagemStatus(id, status);
      } else {
        data.errors?.forEach((error) => toast.error(error));
      }
      toast.success("Status da viagem atualizado com sucesso!");
    } catch (err: any) {
      toast.error("Erro ao remover viagem");
      throw err;
    }
  },

  async aprovarViagem(id: string) {
    try {
      const { data } = await api.put<ApiResponse<null>>(
        `/viagem/${id}/aprovar`
      );

      if (data.success) {
        useViagemStore.getState().updateViagemStatus(id, 2);
      } else {
        data.errors?.forEach((error) => toast.error(error));
      }
      toast.success("Viagem aprovada com sucesso!");
    } catch (err: any) {
      toast.error("Erro ao remover viagem");
      throw err;
    }
  },
};
