import { useEffect, useState } from "react";
import { DataTable } from "../../components/ui/DataTable";
import { motoristaController } from "../../controllers/motoristaController";
import { useMotoristaStore } from "../../store/motoristaStore";
import ConfirmDeleteModal from "../../components/ui/ConfirmDeleteModal";
import {
  motoristaColumns,
  reativarMotoristaActions,
} from "../../layouts/Table/MotoristaTableConfig";
import { CheckCircle2 } from "lucide-react";

export default function ReativarMotoristas() {
  const motoristasDeletados = useMotoristaStore(
    (state) => state.motoristasDeletados
  );
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    loadMotoristasDeletados();
  }, []);

  const handleReativar = async (id: string) => {
    setSelectedId(id);
  };

  const loadMotoristasDeletados = async () => {
    setLoading(true);
    try {
      await motoristaController.fetchMotoristasDeletados();
    } finally {
      setLoading(false);
    }
  };

  const confirmReativar = async () => {
    if (!selectedId) return;
    try {
      motoristaController.reativarMotorista(selectedId);
      loadMotoristasDeletados();
    } catch (error) {
    } finally {
      setSelectedId(null);
    }
  };

  return (
    <>
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-bold text-slate-800">
          Reativar Motoristas
        </h1>
        <p className="text-slate-600">
          Gerencie motoristas que foram deletados e reative-os conforme
          necessário.
        </p>

        <DataTable
          data={motoristasDeletados}
          columns={motoristaColumns}
          actions={reativarMotoristaActions(handleReativar)}
          title="Motoristas Deletados"
          subtitle="Lista de motoristas que foram deletados do sistema"
          loading={loading}
          filterPlaceholder="Buscar motoristas deletados..."
          emptyStateConfig={{
            showCreateButton: false,
            title: "Nenhum motorista deletado encontrado",
            description:
              "Não há motoristas deletados no momento. Todos os motoristas estão ativos.",
          }}
        />
      </div>

      <ConfirmDeleteModal
        open={!!selectedId}
        onClose={() => setSelectedId(null)}
        onConfirm={confirmReativar}
        title="Reativar motorista"
        description="Tem certeza que deseja reativar este motorista?"
        icon={<CheckCircle2 className="h-6 w-6 text-green-500" />}
      />
    </>
  );
}
