import api from "../utils/api";
import type {
  Caminhao,
  CreateCaminhaoDto,
  UpdateCaminhaoDto,
} from "../types/Caminhao";
import { useCaminhaoStore } from "../store/caminhaoStore";
import toast from "react-hot-toast";

export const caminhaoController = {
  async fetchCaminhoes() {
    try {
      const { data } = await api.get<Caminhao[]>("/caminhao");
      useCaminhaoStore.getState().setCaminhoes(data);
    } catch (err) {
      toast.error("Erro ao carregar caminhões");
      throw err;
    }
  },

  async addCaminhao(caminhao: CreateCaminhaoDto) {
    try {
      await api.post("/caminhao", caminhao);
      toast.success("Caminhão adicionado com sucesso!");
      await this.fetchCaminhoes();
    } catch (error) {
      toast.error("Erro ao adicionar caminhão");
      throw error;
    }
  },

  async editCaminhao(id: string, caminhao: UpdateCaminhaoDto) {
    try {
      await api.put(`/caminhao/${id}`, caminhao);
      toast.success("Caminhão editado com sucesso!");
      await this.fetchCaminhoes();
    } catch (error: any) {
      if (error.response?.status === 404) {
        toast.error("Caminhão não encontrado");
      } else {
        toast.error("Erro ao editar caminhão");
      }
      throw error;
    }
  },

  async deleteCaminhao(id: string) {
    try {
      await api.delete(`/caminhao/${id}`);
      toast.success("Caminhão removido com sucesso!");
      await this.fetchCaminhoes(); // Refresh the list
    } catch (error) {
      toast.error("Erro ao remover caminhão");
      throw error;
    }
  },
};
