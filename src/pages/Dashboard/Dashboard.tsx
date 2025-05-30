import { useEffect } from "react";
import { useDashboardStore } from "../../store/dashboardStore";
import { DashCard } from "../../components/ui/DashCard";

export default function Dashboard() {
  const { dados, carregarDashboard, carregando } = useDashboardStore();

  useEffect(() => {
    carregarDashboard();
  }, []);

  if (carregando) return <div>Carregando dashboard...</div>;
  if (!dados) return <div>Erro ao carregar dados.</div>;

  return (
    <main className="py-6 px-12 space-y-12 bg-gray-100 min-h-screen w-full">
      <div className="flex flex-col h-full w-full mx-auto space-y-6">
        <section className="flex flex-col mx-auto bg-white rounded-lg p-6 shadow-md space-y-6 w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full min-w-0">
            <DashCard title="Total de Viagens" value={dados.totalViagens} />
            <DashCard title="Planejadas" value={dados.viagensPlanejadas} />
            <DashCard title="Em Andamento" value={dados.viagensEmAndamento} />
            <DashCard
              title="Concluídas"
              value={dados.viagensConcluidas}
              color="green"
            />
            <DashCard
              title="Canceladas"
              value={dados.viagensCanceladas}
              color="red"
            />
            <DashCard
              title="Quilometragem Total"
              value={`${dados.quilometragemTotal} km`}
            />
            <DashCard
              title="Valor Total de Fretes"
              value={`R$ ${dados.valorTotalFretes.toFixed(2)}`}
            />
            <DashCard
              title="Caminhões Ativos"
              value={dados.totalCaminhoesAtivos}
            />
            <DashCard
              title="Motoristas Ativos"
              value={dados.totalMotoristasAtivos}
            />
            <DashCard
              title="Custo Total das Viagens"
              value={`R$ ${dados.custoTotalViagens.toFixed(2)}`}
            />
            <DashCard
              title="Comissões Pagas"
              value={`R$ ${dados.totalComissoesPagas.toFixed(2)}`}
            />
            <DashCard
              title="Média % Comissão"
              value={`${dados.percentualMedioComissao.toFixed(2)}%`}
            />
          </div>
        </section>
      </div>
    </main>
  );
}
