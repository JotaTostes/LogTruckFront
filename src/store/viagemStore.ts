import { create } from "zustand";
import api from "../utils/api";
import type { Viagem, ViagemCompletas } from "../types/Viagem";
import { toast } from "react-hot-toast";

interface ViagemStore {
  viagens: Viagem[];
  viagensCompletas: ViagemCompletas[];
  carregarViagens: () => Promise<void>;
  carregarViagensCompletas: () => Promise<void>;
  adicionarViagem: (viagem: Omit<Viagem, "status">) => Promise<void>;
  editarViagem: (id: string, viagem: Partial<Viagem>) => Promise<void>;
  editarStatusViagem: (id: string, status: number) => Promise<void>;
  removerViagem: (id: string) => Promise<void>;
}

export enum ViagemStatus {
  PLANEJADA = 1,
  EM_ANDAMENTO = 2,
  CONCLUIDA = 3,
  CANCELADA = 4,
}
export const useViagemStore = create<ViagemStore>((set) => ({
  viagens: [],
  viagensCompletas: [],
  carregarViagens: async () => {
    try {
      const { data } = await api.get<Viagem[]>("/viagem");
      set({ viagens: data });
    } catch (err) {
      toast.error("Erro ao carregar vaigens");
    }
  },
  carregarViagensCompletas: async () => {
    try {
      const { data } = await api.get<ViagemCompletas[]>("/viagem/completa");
      set({ viagensCompletas: data });
    } catch (err) {
      toast.error("Erro ao carregar viagens");
    }
  },
  adicionarViagem: async (viagem) => {
    try {
      await api.post("/viagem", {
        ...viagem,
        status: ViagemStatus.PLANEJADA,
      });
    } catch (error) {
      console.error("Erro ao adicionar viagem:", error);
      throw error;
    }
  },

  editarViagem: async (id, viagem) => {
    try {
      await api.put(`viagem/${id}`, viagem);
    } catch (error) {
      throw error;
    }
  },
  editarStatusViagem: async (id: string, status: number) => {
    try {
      await api.put(`/viagem/${id}/status/${status}`);
      set((state) => ({
        viagens: state.viagens.map((v) => (v.id === id ? { ...v, status } : v)),
        viagensCompletas: state.viagensCompletas.map((v) =>
          v.id === id ? { ...v, status } : v
        ),
      }));
      toast.success("Status da viagem atualizado com sucesso!");
    } catch (err) {
      toast.error("Erro ao atualizar status da viagem");
      throw err;
    }
  },

  removerViagem: async (id) => {
    try {
      await api.delete(`/viagem/${id}`);
      set((state) => ({
        viagens: state.viagens.filter((v) => v.id !== id),
      }));
      toast.success("viagem removida com sucesso!");
    } catch (error) {
      toast.error("Erro ao remover a viagem");
      throw error;
    }
  },
}));
