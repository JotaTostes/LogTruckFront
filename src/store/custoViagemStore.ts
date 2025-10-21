import { create } from "zustand";
import api from "../utils/api";
import type { CustoViagemPayload, CustoViagem } from "../types/CustoViagem";
import { toast } from "react-hot-toast";

interface CustoViagemStore {
  custoViagem: CustoViagem;
  CustoViagemPayload: CustoViagemPayload;
  adicionarCustoViagem: (viagem: CustoViagemPayload) => Promise<void>;
}

export const useCustoViagemStore = create<CustoViagemStore>(() => ({
  custoViagem: {} as CustoViagem,
  CustoViagemPayload: {} as CustoViagemPayload,

  adicionarCustoViagem: async (custoData: CustoViagemPayload) => {
    try {
      await api.post("/custoviagem", custoData);
      toast.success("Custo adicionado com sucesso!");
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.errors?.[0] ||
        "Erro ao adicionar custo na viagem";
      toast.error(errorMessage);
      throw error;
    }
  },
}));
