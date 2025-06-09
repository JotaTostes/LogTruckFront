import { create } from "zustand";
import api from "../utils/api";
import type {
  Caminhao,
  CaminhaoCompletos,
  CreateCaminhaoDto,
} from "../types/Caminhao";
import { toast } from "react-hot-toast";

interface CaminhaoStore {
  caminhoes: Caminhao[];
  caminhoesCompletos: CaminhaoCompletos[];
  carregarCaminhoes: () => Promise<void>;
  carregarCaminhoesCompletos: () => Promise<void>;
  //   fetchMotoristas: (filtro?: string) => Promise<void>;
  adicionarCaminhao: (caminhao: CreateCaminhaoDto) => Promise<void>;
  editarCaminhao: (id: string, caminhao: Partial<Caminhao>) => Promise<void>;
  removerCaminhao: (id: string) => Promise<void>;
}

export const useCaminhaoStore = create<CaminhaoStore>((set) => ({
  caminhoes: [],
  caminhoesCompletos: [],
  carregarCaminhoes: async () => {
    try {
      const { data } = await api.get<Caminhao[]>("/caminhao");
      set({ caminhoes: data });
    } catch (err) {
      toast.error("Erro ao carregar caminhões");
    }
  },
  carregarCaminhoesCompletos: async () => {
    try {
      const { data } = await api.get<CaminhaoCompletos[]>("/caminhao/completo");
      set({ caminhoesCompletos: data });
    } catch (err) {
      toast.error("Erro ao carregar caminhões");
    }
  },
  adicionarCaminhao: async (caminhao) => {
    try {
      await api.post("/caminhao", {
        ...caminhao,
      });
    } catch (error) {
      console.error("Erro ao adicionar caminhao:", error);
      throw error;
    }
  },

  editarCaminhao: async (id, caminhao) => {
    try {
      await api.put(`caminhao/${id}`, caminhao);
    } catch (error) {
      console.error("Erro ao editar caminaho:", error);
      throw error;
    }
  },

  removerCaminhao: async (id) => {
    try {
      await api.delete(`/caminhao/${id}`);
      set((state) => ({
        caminhoes: state.caminhoes.filter((c) => c.id !== id),
      }));
      toast.success("caminhão removida com sucesso!");
    } catch (error) {
      toast.error("Erro ao remover o caminhão");
      throw error;
    }
  },
}));
