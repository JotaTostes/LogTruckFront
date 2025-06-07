import { useState, useEffect } from "react";
import { DataTable } from "../../components/ui/DataTable";
import { useComissaoStore } from "../../store/comissaoStore";
import {
  comissoesColumns,
  createComissoesActions,
} from "../../layouts/Table/ComissaoTableConfig";
import { ComissaoDetailsModal } from "./ComissaoDetailsModal";
import type { Comissao, ComissaoCompleta } from "../../types/Comissao";
import toast from "react-hot-toast";

export default function Comissoes() {
  const { comissoes, carregarComissoes, setarComoPaga } = useComissaoStore();
  const [loading, setLoading] = useState(true);
  const [selectedComissao, setSelectedComissao] =
    useState<ComissaoCompleta | null>(null);

  useEffect(() => {
    loadComissoes();
  }, []);

  const loadComissoes = async () => {
    setLoading(true);
    try {
      await carregarComissoes();
    } finally {
      setLoading(false);
    }
  };

  const handleSetPaid = async (id: string) => {
    try {
      await setarComoPaga(id);
      toast.success("Comissão marcada como paga!");
    } catch (error) {
      toast.error("Erro ao atualizar status da comissão");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 p-6">
      <DataTable
        data={comissoes}
        columns={comissoesColumns}
        actions={createComissoesActions(setSelectedComissao, handleSetPaid)}
        title="Comissões a Pagar"
        subtitle="Gerencie as comissões dos motoristas"
        loading={loading}
        filterPlaceholder="Buscar comissões..."
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
