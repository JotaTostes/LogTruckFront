import { useState, useEffect } from "react";
import { DataTable } from "../../../components/ui/DataTable";
import { Check, Eye } from "lucide-react";
import { useViagemStore } from "../../../store/viagemStore";
import { ViagemDetailsModal } from "../ViagemDetailsModal";
import type { ViagemCompletas } from "../../../types/Viagem";
import {
  aprovarViagemActions,
  aprovarViagemColumns,
} from "../../../layouts/Table/ViagensTableConfig";
import toast from "react-hot-toast";
import { viagemController } from "../../../controllers/viagemController";

export default function AprovarViagens() {
  const viagensCompletas = useViagemStore((state) => state.viagensCompletas);
  const [loading, setLoading] = useState(true);
  const [selectedViagem, setSelectedViagem] = useState<ViagemCompletas | null>(
    null
  );

  useEffect(() => {
    loadViagens();
  }, []);

  const loadViagens = async () => {
    setLoading(true);
    try {
      viagemController.fetchViagensCompletas();
    } finally {
      setLoading(false);
    }
  };

  const handleAprovar = async (viagem: ViagemCompletas) => {
    try {
      if (viagem.id) {
        viagemController.aprovarViagem(viagem.id);
      } else {
        toast.error("Viagem não encontrada para aprovação.");
      }
      await loadViagens();
    } catch (error) {}
  };

  const viagensPlanejadas = viagensCompletas.filter(
    (viagem) => viagem.status === 1
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 p-6">
      <DataTable
        data={viagensPlanejadas}
        columns={aprovarViagemColumns}
        actions={aprovarViagemActions(
          (viagem: ViagemCompletas) => {
            setSelectedViagem(viagem);
          },
          (id: string) => {
            const viagem = viagensCompletas.find((v) => v.id === id);
            if (viagem) {
              handleAprovar(viagem);
            } else {
              toast.error("Viagem não encontrada.");
            }
          }
        )}
        title="Aprovar Viagens"
        subtitle="Gerencie as viagens que estão em planejamento"
        loading={loading}
        filterPlaceholder="Buscar viagens..."
        emptyStateConfig={{
          title: "Nenhuma viagem a ser aprovada",
          showCreateButton: false,
          description:
            "Todas as viagens planejadas foram aprovadas ou não há viagens pendentes.",
        }}
      />

      <ViagemDetailsModal
        open={!!selectedViagem}
        onClose={() => setSelectedViagem(null)}
        viagem={selectedViagem}
      />
    </div>
  );
}
