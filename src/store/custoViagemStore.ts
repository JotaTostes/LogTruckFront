import { create } from "zustand";
import api from "../utils/api";
import type {
  CustoViagemPayload,
  CustoViagem,
  CustoViagemCompletoDto,
} from "../types/CustoViagem";
import { toast } from "react-hot-toast";

interface CustoViagemStore {
  custoViagem: CustoViagem;
  custosViagensCompletos: CustoViagemCompletoDto[];
  CustoViagemPayload: CustoViagemPayload;
  adicionarCustoViagem: (viagem: CustoViagemPayload) => Promise<void>;
  fetchCustosViagensCompletos: () => Promise<void>;
}

export const useCustoViagemStore = create<CustoViagemStore>((set) => ({
  custoViagem: {} as CustoViagem,
  CustoViagemPayload: {} as CustoViagemPayload,
  custosViagensCompletos: [],

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

  fetchCustosViagensCompletos: async () => {
    try {
      const { data } = await api.get<CustoViagemCompletoDto[]>(
        "/custoviagem/completo"
      );
      set({ custosViagensCompletos: data });
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.errors?.[0] ||
        "Erro ao buscar custos das viagens";
      toast.error(errorMessage);
      throw error;
    }
  },
}));
