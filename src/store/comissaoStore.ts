import { create } from "zustand";
import api from "../utils/api";
import type { ComissaoCompleta } from "../types/Comissao";

interface ComissaoStore {
  comissoes: ComissaoCompleta[];
  carregarComissoes: () => Promise<void>;
  setarComoPaga: (id: string) => Promise<void>;
}

export const useComissaoStore = create<ComissaoStore>((set) => ({
  comissoes: [],
  carregarComissoes: async () => {
    const response = await api.get("/comissao/completas");
    set({ comissoes: response.data });
  },
  setarComoPaga: async (id: string) => {
    try {
      await api.put(`/comissao/${id}/pagar`);
      set((state) => ({
        comissoes: state.comissoes.map((c) =>
          c.id === id ? { ...c, pago: true } : c
        ),
      }));
    } catch (error) {
      throw error;
    }
  },
}));
