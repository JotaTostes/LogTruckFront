import { useEffect, useState } from "react";
import { Plus, MapPinned, Search, Filter } from "lucide-react";
import toast from "react-hot-toast";

// UI Components
import { Button } from "../../components/ui/Button";
import ConfirmDeleteModal from "../../components/ui/ConfirmDeleteModal";
import { DataTable } from "../../components/ui/DataTable";
import { MTTypography as Typography } from "../../components/ui/mt/MTTypography";

// Modals
import { ViagemFormModal } from "./ViagemFormModal";
import { ViagemCustosFormModal } from "./Custos/ViagemCustosFormModal";
import { ViagemDetailsModal } from "./ViagemDetailsModal";
import { StatusUpdateModal } from "./StatusUpdateModal";

// Stores
import { useViagemStore } from "../../store/viagemStore";
import { useMotoristaStore } from "../../store/motoristaStore";
import { useCaminhaoStore } from "../../store/caminhaoStore";

// Controllers
import { caminhaoController } from "../../controllers/caminhaoController";
import { motoristaController } from "../../controllers/motoristaController";
import { viagemController } from "../../controllers/viagemController";

// Table Config
import {
  createViagemActions,
  viagemColumns,
} from "../../layouts/Table/ViagensTableConfig";

// Types
import type { Viagem, ViagemCompletas } from "../../types/Viagem";

export default function Viagens() {
  const viagensCompletas = useViagemStore((state) => state.viagensCompletas);
  const motoristas = useMotoristaStore((state) => state.motoristas);
  const caminhoes = useCaminhaoStore((state) => state.caminhoes);
  const caminhoesCompletos = useCaminhaoStore(
    (state) => state.caminhoesCompletos
  );
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Viagem | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [statusUpdateId, setStatusUpdateId] = useState<string | null>(null);
  const [currentStatus, setCurrentStatus] = useState<number>(1);
  const [isCustosModalOpen, setIsCustosModalOpen] = useState(false);
  const [selectedViagemParaCustos, setSelectedViagemParaCustos] =
    useState<ViagemCompletas | null>(null);
  const [selectedViagemForDetails, setSelectedViagemForDetails] =
    useState<ViagemCompletas | null>(null);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        loadViagensCompletas();
        loadMotoristas();
        loadCaminhoes();
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const loadCaminhoes = async () => {
    setLoading(true);
    try {
      await caminhaoController.fetchCaminhoes();
    } finally {
      setLoading(false);
    }
  };
  const loadViagensCompletas = async () => {
    setLoading(true);
    try {
      await viagemController.fetchViagensCompletas();
    } catch (error) {
      toast.error("Erro ao carregar viagens");
    } finally {
      setLoading(false);
    }
  };
  const loadMotoristas = async () => {
    setLoading(true);
    try {
      await motoristaController.fetchMotoristasCompletos();
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = (viagem: ViagemCompletas) => {
    setStatusUpdateId(viagem.id ?? null);
    setCurrentStatus(viagem.status ?? 1);
  };

  const handleCreate = () => {
    setSelected(null);
    setOpen(true);
  };

  const handleEdit = (viagem: Viagem) => {
    setSelected(viagem);
    setOpen(true);
  };

  const handleDelete = (id: string) => {
    setDeleteId(id);
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    try {
      await viagemController.deleteViagem(deleteId);
      await viagemController.fetchViagensCompletas();
    } catch (error) {
    } finally {
      setDeleteId(null);
    }
  };

  const confirmStatusUpdate = async (newStatus: number) => {
    if (!statusUpdateId) return;
    try {
      viagemController.updateViagemStatus(statusUpdateId, newStatus);
      viagemController.fetchViagensCompletas();
    } catch (error) {
    } finally {
      setStatusUpdateId(null);
    }
  };

  const handleOpenCustosModal = (viagem: ViagemCompletas) => {
    setSelectedViagemParaCustos(viagem);
    setIsCustosModalOpen(true);
  };

  const handleSuccess = () => {
    setOpen(false);
    loadViagensCompletas();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white/80 backdrop-blur-xl border border-white/20 rounded-3xl p-8 mb-8 shadow-xl shadow-blue-500/10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur-xl opacity-30"></div>
                  <div className="relative bg-gradient-to-r from-blue-600 to-indigo-600 p-4 rounded-2xl">
                    <MapPinned className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div>
                  <Typography
                    variant="h1"
                    color="blue-gray"
                    className="font-bold text-3xl lg:text-4xl bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent"
                  >
                    Gerenciar Viagens
                  </Typography>
                  <p className="text-slate-500 mt-2 text-lg">
                    {loading
                      ? "Carregando..."
                      : `${viagensCompletas.length} ${
                          viagensCompletas.length === 1
                            ? "viagem cadastrada"
                            : "viagens cadastradas"
                        }`}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                variant="secondary"
                onClick={handleCreate}
                className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 transition-all duration-300 rounded-xl font-medium text-white border-0"
                showArrow={false}
                icon={<Plus className="h-4 w-4" />}
              >
                Nova Viagem
              </Button>
            </div>
          </div>
        </div>

        <div className="bg-white/90 backdrop-blur-xl border border-white/30 rounded-3xl shadow-2xl shadow-slate-200/50 overflow-hidden">
          <div className="bg-gradient-to-r from-slate-50 to-blue-50 px-8 py-6 border-b border-slate-200/50">
            <div className="flex items-center justify-between">
              <div>
                <Typography
                  variant="h3"
                  color="blue-gray"
                  className="font-semibold text-xl"
                >
                  Lista de Viagens
                </Typography>
              </div>
              {loading && (
                <div className="flex items-center gap-2 text-blue-600">
                  <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-sm font-medium">Carregando...</span>
                </div>
              )}
            </div>
          </div>

          <div className="p-8">
            <DataTable
              data={viagensCompletas}
              columns={viagemColumns}
              actions={createViagemActions(
                handleEdit,
                handleDelete,
                handleStatusUpdate,
                handleOpenCustosModal,
                setSelectedViagemForDetails
              )}
              title="Viagens Cadastradas"
              subtitle="Gerencie todas as viagens cadastradas"
              loading={loading}
              filterPlaceholder="Buscar viagens..."
              emptyStateConfig={{
                showCreateButton: false,
                title: "Nenhuma viagem encontrada",
                description: "Parece que ainda não há viagens cadastradas.",
              }}
            />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="bg-white/80 backdrop-blur-xl border border-white/30 rounded-2xl p-6 shadow-lg shadow-blue-500/5">
          <div className="flex items-center gap-4">
            <div className="bg-green-100 p-3 rounded-xl">
              <MapPinned className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium">
                Total de viagens
              </p>
              <p className="text-2xl font-bold text-slate-800">
                {viagensCompletas.length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-xl border border-white/30 rounded-2xl p-6 shadow-lg shadow-blue-500/5">
          <div className="flex items-center gap-4">
            <div className="bg-blue-100 p-3 rounded-xl">
              <Plus className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium">
                Total de viagens concluidas
              </p>
              <p className="text-2xl font-bold text-slate-800">
                {viagensCompletas.filter((v) => v.status === 3).length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-xl border border-white/30 rounded-2xl p-6 shadow-lg shadow-blue-500/5">
          <div className="flex items-center gap-4">
            <div className="bg-purple-100 p-3 rounded-xl">
              <Filter className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium">
                Último Cadastro
              </p>
              <p className="text-sm font-medium text-slate-600">
                {viagensCompletas.length === 0
                  ? "Nenhum"
                  : (() => {
                      const last = viagensCompletas
                        .map((v) => new Date(v.criadoEm))
                        .sort((a, b) => b.getTime() - a.getTime())[0];
                      const now = new Date();
                      const diffMs = now.getTime() - last.getTime();
                      const diffDays = Math.floor(
                        diffMs / (1000 * 60 * 60 * 24)
                      );
                      if (diffDays === 0) return "Hoje";
                      if (diffDays === 1) return "Ontem";
                      return `${diffDays} dias atrás`;
                    })()}
              </p>
            </div>
          </div>
        </div>
      </div>

      <ViagemFormModal
        open={open}
        onClose={() => setOpen(false)}
        viagem={selected}
        caminhoes={caminhoes}
        onSuccess={handleSuccess}
        motoristas={motoristas}
      />

      <ViagemCustosFormModal
        open={isCustosModalOpen}
        onClose={() => {
          setIsCustosModalOpen(false);
          setSelectedViagemParaCustos(null);
        }}
        viagem={selectedViagemParaCustos}
        onSuccess={() => {
          setIsCustosModalOpen(false);
          setSelectedViagemParaCustos(null);
          loadViagensCompletas();
          toast.success("Custo adicionado com sucesso!");
        }}
      />

      <ViagemDetailsModal
        open={!!selectedViagemForDetails}
        onClose={() => setSelectedViagemForDetails(null)}
        viagem={selectedViagemForDetails}
      />

      <ConfirmDeleteModal
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={confirmDelete}
        title="Remover Viagem"
        description="Tem certeza que deseja remover esta viagem? Esta ação não poderá ser desfeita."
      />

      <StatusUpdateModal
        open={!!statusUpdateId}
        onClose={() => setStatusUpdateId(null)}
        onConfirm={confirmStatusUpdate}
        currentStatus={currentStatus}
      />
    </div>
  );
}
