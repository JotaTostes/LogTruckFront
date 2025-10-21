import { useEffect } from "react";
import { useDashboardStore } from "../../store/dashboardStore";
import {
  BarChart3,
  TrendingUp,
  MapPin,
  Truck,
  Users,
  DollarSign,
  Route,
  Clock,
  CheckCircle2,
  XCircle,
  Activity,
  Gauge,
  Sparkles,
  RefreshCw,
  BanknoteX,
} from "lucide-react";
import { Button } from "../../components/ui/Button";
import { dashboardController } from "../../controllers/dashboardCController";

export default function Dashboard() {
  const dados = useDashboardStore((state) => state.dados);
  const carregando = useDashboardStore((state) => state.carregando);

  useEffect(() => {
    dashboardController.fetchDashboardData();
  }, []);

  const handleRefresh = () => {
    dashboardController.fetchDashboardData();
  };

  if (carregando) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center justify-center py-24 space-y-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full blur-xl opacity-30 animate-pulse"></div>
              <div className="relative bg-gradient-to-r from-blue-600 to-indigo-600 p-6 rounded-full">
                <BarChart3 className="h-12 w-12 text-white animate-pulse" />
              </div>
            </div>
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                Carregando Dashboard
              </h2>
              <p className="text-slate-500">Buscando dados atualizados...</p>
              <div className="flex items-center justify-center gap-2 mt-4">
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
                <div
                  className="w-3 h-3 bg-indigo-500 rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="w-3 h-3 bg-purple-500 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!dados) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center justify-center py-24 space-y-6">
            <div className="bg-red-100 p-6 rounded-full">
              <XCircle className="h-12 w-12 text-red-600" />
            </div>
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-red-800">
                Erro ao Carregar
              </h2>
              <p className="text-slate-500">
                Não foi possível carregar os dados do dashboard.
              </p>
              <button
                onClick={handleRefresh}
                className="mt-4 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-medium hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg"
              >
                <RefreshCw className="h-4 w-4 mr-2 inline" />
                Tentar Novamente
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const cardConfigs = [
    {
      title: "Total de Viagens",
      value: dados.totalViagens,
      icon: <Route className="h-6 w-6" />,
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-50 to-cyan-50",
    },
    {
      title: "Planejadas",
      value: dados.viagensPlanejadas,
      icon: <Clock className="h-6 w-6" />,
      gradient: "from-amber-500 to-orange-500",
      bgGradient: "from-amber-50 to-orange-50",
    },
    {
      title: "Em Andamento",
      value: dados.viagensEmAndamento,
      icon: <Activity className="h-6 w-6" />,
      gradient: "from-purple-500 to-indigo-500",
      bgGradient: "from-purple-50 to-indigo-50",
    },
    {
      title: "Concluídas",
      value: dados.viagensConcluidas,
      icon: <CheckCircle2 className="h-6 w-6" />,
      gradient: "from-green-500 to-emerald-500",
      bgGradient: "from-green-50 to-emerald-50",
    },
    {
      title: "Canceladas",
      value: dados.viagensCanceladas,
      icon: <XCircle className="h-6 w-6" />,
      gradient: "from-red-500 to-rose-500",
      bgGradient: "from-red-50 to-rose-50",
    },
    {
      title: "Quilometragem Total",
      value: `${dados.quilometragemTotal} km`,
      icon: <MapPin className="h-6 w-6" />,
      gradient: "from-teal-500 to-cyan-500",
      bgGradient: "from-teal-50 to-cyan-50",
    },
    {
      title: "Valor Total de Fretes",
      value: `R$ ${dados.valorTotalFretes.toFixed(2)}`,
      icon: <DollarSign className="h-6 w-6" />,
      gradient: "from-green-600 to-lime-500",
      bgGradient: "from-green-50 to-lime-50",
    },
    {
      title: "Caminhões Ativos",
      value: dados.totalCaminhoesAtivos,
      icon: <Truck className="h-6 w-6" />,
      gradient: "from-slate-600 to-gray-700",
      bgGradient: "from-slate-50 to-gray-50",
    },
    {
      title: "Motoristas Ativos",
      value: dados.totalMotoristasAtivos,
      icon: <Users className="h-6 w-6" />,
      gradient: "from-indigo-600 to-purple-600",
      bgGradient: "from-indigo-50 to-purple-50",
    },
    {
      title: "Custo Total das Viagens",
      value: `R$ ${dados.custoTotalViagens.toFixed(2)}`,
      icon: <BarChart3 className="h-6 w-6" />,
      gradient: "from-red-600 to-pink-600",
      bgGradient: "from-red-50 to-pink-50",
    },
    {
      title: "Comissões Pagas",
      value: `R$ ${dados.totalComissoesPagas.toFixed(2)}`,
      icon: <TrendingUp className="h-6 w-6" />,
      gradient: "from-emerald-600 to-teal-600",
      bgGradient: "from-emerald-50 to-teal-50",
    },
    {
      title: "Comisões a Pagar",
      value: `R$ ${dados.totalComissoesPagar.toFixed(2)}`,
      icon: <BanknoteX className="h-6 w-6" />,
      gradient: "from-blue-600 to-cyan-600",
      bgGradient: "from-blue-50 to-cyan-50",
    },
    {
      title: "Média % Comissão",
      value: `${dados.percentualMedioComissao.toFixed(2)}%`,
      icon: <Gauge className="h-6 w-6" />,
      gradient: "from-violet-600 to-purple-600",
      bgGradient: "from-violet-50 to-purple-50",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Premium */}
        <div className="bg-white/80 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-xl shadow-blue-500/10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur-xl opacity-30"></div>
                  <div className="relative bg-gradient-to-r from-blue-600 to-indigo-600 p-4 rounded-2xl">
                    <BarChart3 className="h-8 w-8 text-white" />
                  </div>
                </div>
                <div>
                  <h1 className="font-bold text-3xl lg:text-4xl bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                    Dashboard
                  </h1>
                  <p className="text-slate-500 mt-2 text-lg">
                    Visão geral completa das operações
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-green-600 bg-green-50 px-4 py-2 rounded-xl">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">Dados Atualizados</span>
              </div>
              <Button
                showArrow={false}
                icon={<RefreshCw className="h-4 w-4" />}
                onClick={handleRefresh}
                variant="secondary"
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-medium shadow-lg shadow-blue-500/30 transition-all duration-300 hover:shadow-blue-500/40"
              >
                Atualizar
              </Button>
            </div>
          </div>
        </div>

        {/* Cards Section */}
        <div className="bg-white/90 backdrop-blur-xl border border-white/30 rounded-3xl shadow-2xl shadow-slate-200/50 overflow-hidden">
          {/* Section Header */}
          <div className="bg-gradient-to-r from-slate-50 to-blue-50 px-8 py-6 border-b border-slate-200/50">
            <div className="flex items-center gap-3">
              <Sparkles className="h-6 w-6 text-blue-600" />
              <div>
                <h2 className="text-xl font-semibold text-slate-800">
                  Métricas Principais
                </h2>
                <p className="text-slate-500 text-sm">
                  Indicadores chave de performance
                </p>
              </div>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {cardConfigs.map((config) => (
                <div
                  key={config.title}
                  className={`group relative bg-gradient-to-br ${config.bgGradient} border border-white/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1 cursor-pointer overflow-hidden`}
                >
                  {/* Background decoration */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-white/20 rounded-full blur-2xl opacity-50 group-hover:opacity-80 transition-opacity duration-500"></div>

                  {/* Icon */}
                  <div className="relative mb-4">
                    <div
                      className={`inline-flex p-3 rounded-2xl bg-gradient-to-r ${config.gradient} shadow-lg shadow-current/30`}
                    >
                      <div className="text-white">{config.icon}</div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative space-y-2">
                    <h3 className="font-medium text-slate-600 text-sm leading-tight">
                      {config.title}
                    </h3>
                    <p className="text-2xl font-bold text-slate-800 group-hover:scale-105 transition-transform duration-300">
                      {config.value}
                    </p>
                  </div>

                  {/* Hover effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Stats Footer */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/80 backdrop-blur-xl border border-white/30 rounded-2xl p-6 shadow-lg shadow-blue-500/5">
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 p-3 rounded-xl">
                <Activity className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-slate-500 font-medium">
                  Status do Sistema
                </p>
                <p className="text-lg font-bold text-green-600">Operacional</p>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-xl border border-white/30 rounded-2xl p-6 shadow-lg shadow-blue-500/5">
            <div className="flex items-center gap-4">
              <div className="bg-green-100 p-3 rounded-xl">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-slate-500 font-medium">
                  Performance
                </p>
                <p className="text-lg font-bold text-green-600">Excelente</p>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-xl border border-white/30 rounded-2xl p-6 shadow-lg shadow-blue-500/5">
            <div className="flex items-center gap-4">
              <div className="bg-purple-100 p-3 rounded-xl">
                <Sparkles className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-slate-500 font-medium">
                  Última Atualização
                </p>
                <p className="text-sm font-medium text-slate-600">Agora</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
