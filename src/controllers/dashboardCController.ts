import { useDashboardStore } from "../store/dashboardStore";
import api from "../utils/api";
import { toast } from "react-hot-toast";
import type { DashboardDto } from "../types/Dashboard";

export const dashboardController = {
  async fetchDashboardData() {
    try {
      useDashboardStore.setState({ carregando: true });
      const { data } = await api.get<DashboardDto>("/dashboard");
      useDashboardStore.setState({ dados: data });
    } catch (err) {
      toast.error("Erro ao carregar dados do dashboard");
      throw err;
    } finally {
      useDashboardStore.setState({ carregando: false });
    }
  },
};
