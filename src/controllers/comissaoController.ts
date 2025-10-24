import { useComissaoStore } from "../store/comissaoStore";
import api from "../utils/api";
import { toast } from "react-hot-toast";
import type { ComissaoCompleta } from "../types/Comissao";
import type { ApiResponse } from "../types/ApiResponse";

export const comissaoController = {
  async fetchComissoes() {
    try {
      const { data } = await api.get<ApiResponse<ComissaoCompleta[]>>(
        "/comissao/completas"
      );

      if (data.success) {
        useComissaoStore.getState().setComissoes(data.content || []);
      } else {
        data.errors?.forEach((error) => toast.error(error));
      }
    } catch (err) {
      toast.error("Erro ao carregar comissões");
      throw err;
    }
  },

  async setComissaoAsPaid(id: string) {
    try {
      const { data } = await api.put<ApiResponse<null>>(
        `/comissao/${id}/pagar`
      );

      if (data.success) {
        useComissaoStore.getState().updateComissaoStatus(id, true);
      } else {
        data.errors?.forEach((error) => toast.error(error));
      }

      toast.success("Comissão marcada como paga!");
    } catch (err) {
      toast.error("Erro ao marcar comissão como paga");
      throw err;
    }
  },
};
