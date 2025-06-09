import { create } from "zustand";
import api from "../utils/api";
import { toast } from "react-hot-toast";
import type { DashboardDto } from "../types/Dashboard";

type DashboardState = {
  dados: DashboardDto | null;
  carregarDashboard: () => Promise<void>;
  carregando: boolean;
};

export const useDashboardStore = create<DashboardState>((set) => ({
  dados: null,
  carregando: false,

  carregarDashboard: async () => {
    set({ carregando: true });
    try {
      const response = await api.get<DashboardDto>("/dashboard");
      set({ dados: response.data });
    } catch (error) {
      toast.error("Erro ao carregar dados do dashboard");
    } finally {
      set({ carregando: false });
    }
  },
}));
