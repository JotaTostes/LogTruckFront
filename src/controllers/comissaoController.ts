import { useComissaoStore } from "../store/comissaoStore";
import api from "../utils/api";
import { toast } from "react-hot-toast";
import type { ComissaoCompleta } from "../types/Comissao";

export const comissaoController = {
  async fetchComissoes() {
    try {
      const { data } = await api.get<ComissaoCompleta[]>("/comissao/completas");
      useComissaoStore.getState().setComissoes(data);
    } catch (err) {
      toast.error("Erro ao carregar comissões");
      throw err;
    }
  },

  async setComissaoAsPaid(id: string) {
    try {
      await api.put(`/comissao/${id}/pagar`);
      useComissaoStore.getState().updateComissaoStatus(id, true);
      toast.success("Comissão marcada como paga!");
    } catch (err) {
      toast.error("Erro ao marcar comissão como paga");
      throw err;
    }
  },
};
