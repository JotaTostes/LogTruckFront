import { create } from "zustand";
import type { Viagem, ViagemCompletas } from "../types/Viagem";

interface ViagemStore {
  viagens: Viagem[];
  viagensCompletas: ViagemCompletas[];
  setViagensCompletas: (viagensCompletas: ViagemCompletas[]) => void;
  updateViagemStatus: (id: string, status: number) => void;
}

export const useViagemStore = create<ViagemStore>((set) => ({
  viagens: [],
  viagensCompletas: [],
  setViagensCompletas: (viagensCompletas) => set({ viagensCompletas }),
  updateViagemStatus: (id, status) =>
    set((state) => ({
      viagensCompletas: state.viagensCompletas.map((v) =>
        v.id === id ? { ...v, status } : v
      ),
    })),
}));
