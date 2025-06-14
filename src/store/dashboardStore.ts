import { create } from "zustand";
import type { DashboardDto } from "../types/Dashboard";

type DashboardState = {
  dados: DashboardDto | null;
  carregando: boolean;
  setDados: (dados: DashboardDto) => void;
  setCarregando: (carregando: boolean) => void;
};

export const useDashboardStore = create<DashboardState>((set) => ({
  dados: null,
  carregando: false,
  setDados: (dados) => set({ dados }),
  setCarregando: (carregando) => set({ carregando }),
}));
