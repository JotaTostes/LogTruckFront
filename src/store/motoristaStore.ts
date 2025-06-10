import { create } from "zustand";
import api from "../utils/api";
import type { Motorista, MotoristaCompleto } from "../types/Motorista";
import { toast } from "react-hot-toast";
import axios from "axios";

interface MotoristaStore {
  motoristas: Motorista[];
  motoristasCompletos: MotoristaCompleto[];
  carregarMotoristas: () => Promise<void>;
  carregarMotoristasCompletos: () => Promise<void>;
  fetchMotoristas: (filtro?: string) => Promise<void>;
  adicionarMotorista: (motorista: Motorista) => Promise<void>;
  editarMotorista: (id: string, motorista: Partial<Motorista>) => Promise<void>;
  removerMotorista: (id: string) => Promise<void>;
}

export const useMotoristaStore = create<MotoristaStore>((set) => ({
  motoristas: [],
  motoristasCompletos: [],
  carregarMotoristas: async () => {
    try {
      const { data } = await api.get<Motorista[]>("/motorista");
      set({ motoristas: data });
    } catch (err) {
      toast.error("Erro ao carregar motoristas");
    }
  },
  carregarMotoristasCompletos: async () => {
    try {
      const { data } = await api.get<MotoristaCompleto[]>(
        "motorista/motoristas-completos"
      );
      set({ motoristasCompletos: data });
    } catch (err) {}
  },
  fetchMotoristas: async (filtro) => {
    try {
      const query = filtro ? `?search=${encodeURIComponent(filtro)}` : "";
      const response = await axios.get(`/motoristas${query}`);
      set({ motoristas: response.data });
    } catch (error) {
      console.error("Erro ao buscar motoristas:", error);
    }
  },

  adicionarMotorista: async (motorista) => {
    try {
      await api.post("/motorista", motorista);
    } catch (error) {
      throw error;
    }
  },

  editarMotorista: async (id, motorista) => {
    try {
      await api.put(`motorista/${id}`, motorista);
    } catch (error) {
      throw error;
    }
  },

  removerMotorista: async (id) => {
    try {
      await api.delete(`/motorista/${id}`);
      set((state) => ({
        motoristas: state.motoristas.filter((m) => m.id !== id),
      }));
      toast.success("Motorista removido com sucesso!");
    } catch (error) {
      toast.error("Erro ao remover motorista");
      throw error;
    }
  },
}));
