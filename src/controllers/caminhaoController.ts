import api from "../utils/api";
import type {
  Caminhao,
  CreateCaminhaoDto,
  UpdateCaminhaoDto,
} from "../types/Caminhao";
import type { ApiResponse } from "../types/ApiResponse";

import { useCaminhaoStore } from "../store/caminhaoStore";
import toast from "react-hot-toast";

export const caminhaoController = {
  async fetchCaminhoes() {
    try {
      const { data } = await api.get<ApiResponse<Caminhao[]>>("/caminhao");

      if (data.success) {
        useCaminhaoStore.getState().setCaminhoes(data.content || []);
      } else {
        data.errors?.forEach((error) => toast.error(error));
      }
    } catch (err) {
      toast.error("Erro ao carregar caminhões");
      throw err;
    }
  },

  async addCaminhao(caminhao: CreateCaminhaoDto) {
    try {
      const { data } = await api.post<ApiResponse<Caminhao>>(
        "/caminhao",
        caminhao
      );

      if (data.success) {
        toast.success("Caminhão adicionado com sucesso!");
        await this.fetchCaminhoes();
      } else {
        data.errors?.forEach((error) => toast.error(error));
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.Errors?.[0] || "Erro ao adicionar caminhão";
      toast.error(errorMessage);
      throw error;
    }
  },

  async editCaminhao(id: string, caminhao: UpdateCaminhaoDto) {
    try {
      const { data } = await api.put<ApiResponse<Caminhao>>(
        `/caminhao/${id}`,
        caminhao
      );

      if (data.success) {
        toast.success("Caminhão editado com sucesso!");
        await this.fetchCaminhoes();
      } else {
        data.errors?.forEach((error) => toast.error(error));
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.Errors?.[0] || "Erro ao editar caminhão";
      toast.error(errorMessage);
      throw error;
    }
  },

  async deleteCaminhao(id: string) {
    try {
      const { data } = await api.delete<ApiResponse<Caminhao>>(
        `/caminhao/${id}`
      );

      if (data.success) {
        toast.success("Caminhão removido com sucesso!");
        await this.fetchCaminhoes();
      } else {
        data.errors?.forEach((error) => toast.error(error));
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.Errors?.[0] || "Erro ao remover caminhão";
      toast.error(errorMessage);
      throw error;
    }
  },
};
