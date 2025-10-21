import { useState, useEffect } from "react";
import { DataTable } from "../../components/ui/DataTable";
import { useComissaoStore } from "../../store/comissaoStore";
import { comissaoController } from "../../controllers/comissaoController";
import {
  comissoesColumns,
  createComissoesActions,
} from "../../layouts/Table/ComissaoTableConfig";
import { ComissaoDetailsModal } from "./ComissaoDetailsModal";
import type { ComissaoCompleta } from "../../types/Comissao";

export default function Comissoes() {
  const comissoes = useComissaoStore((state) => state.comissoes);
  const [loading, setLoading] = useState(true);
  const [selectedComissao, setSelectedComissao] =
    useState<ComissaoCompleta | null>(null);

  useEffect(() => {
    loadComissoes();
  }, []);

  const loadComissoes = async () => {
    setLoading(true);
    try {
      await comissaoController.fetchComissoes();
    } finally {
      setLoading(false);
    }
  };

  const handleSetPaid = async (id: string) => {
    try {
      await comissaoController.setComissaoAsPaid(id);
    } catch (error) {}
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 p-6">
      <DataTable
        data={comissoes.filter((c) => !c.pago)}
        columns={comissoesColumns}
        actions={createComissoesActions(setSelectedComissao, handleSetPaid)}
        title="Comissões a Pagar"
        subtitle="Gerencie as comissões dos motoristas"
        loading={loading}
        filterPlaceholder="Buscar comissões..."
        emptyStateConfig={{
          showCreateButton: false,
          title: "Nenhuma comissão aencontrada",
          description: "Nehuma comissão pendente de pagamento foi encontrada.",
        }}
      />

      <ComissaoDetailsModal
        open={!!selectedComissao}
        onClose={() => setSelectedComissao(null)}
        comissao={selectedComissao}
        comissoes={comissoes}
      />
    </div>
  );
}
