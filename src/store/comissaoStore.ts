import { create } from "zustand";
import type { ComissaoCompleta } from "../types/Comissao";

interface ComissaoStore {
  comissoes: ComissaoCompleta[];
  setComissoes: (comissoes: ComissaoCompleta[]) => void;
  updateComissaoStatus: (id: string, pago: boolean) => void;
}

export const useComissaoStore = create<ComissaoStore>((set) => ({
  comissoes: [],
  setComissoes: (comissoes) => set({ comissoes }),
  updateComissaoStatus: (id, pago) =>
    set((state) => ({
      comissoes: state.comissoes.map((c) => (c.id === id ? { ...c, pago } : c)),
    })),
}));
