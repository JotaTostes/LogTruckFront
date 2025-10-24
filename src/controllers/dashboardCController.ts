import { useDashboardStore } from "../store/dashboardStore";
import api from "../utils/api";
import { toast } from "react-hot-toast";
import type { DashboardDto } from "../types/Dashboard";
import type { ApiResponse } from "../types/ApiResponse";

export const dashboardController = {
  async fetchDashboardData() {
    try {
      useDashboardStore.setState({ carregando: true });

      const { data } = await api.get<ApiResponse<DashboardDto>>("/dashboard");

      if (data.success) {
        useDashboardStore.setState({ dados: data.content || null });
      } else {
        data.errors?.forEach((error) => toast.error(error));
      }
    } catch (err) {
      toast.error("Erro ao carregar dados do dashboard");
      throw err;
    } finally {
      useDashboardStore.setState({ carregando: false });
    }
  },
};
