import { useEffect, useState } from "react";
import { Plus, MapPinned, Search, Filter } from "lucide-react";
import { Button } from "../../components/ui/Button";
import { MTTypography as Typography } from "../../components/ui/mt/MTTypography";
import { useViagemStore } from "../../store/viagemStore";
import { ViagemFormModal } from "./ViagemFormModal";
import ConfirmDeleteModal from "../../components/ui/ConfirmDeleteModal";
import ViagemTable from "./ViagensTable";
import type { Viagem } from "../../types/Viagem";
import toast from "react-hot-toast";
import { useMotoristaStore } from "../../store/motoristaStore";

export default function Viagens() {
  const { viagens, viagensCompletas, carregarViagensCompletas, removerViagem } =
    useViagemStore();
  const { motoristas, carregarMotoristas } = useMotoristaStore();
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Viagem | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        await carregarViagensCompletas();
        await carregarMotoristas;
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

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
      await removerViagem(deleteId);
      toast.success("Viagem removida com sucesso!");
      carregarViagensCompletas();
    } catch (error) {
      toast.error("Erro ao remover viagem");
    } finally {
      setDeleteId(null);
    }
  };

  const handleSuccess = () => {
    setOpen(false);
    carregarViagensCompletas();
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
                variant="outline"
                className="flex items-center gap-2 px-6 py-3 border-2 border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-300 rounded-xl font-medium"
                showArrow={false}
              >
                <Search className="h-4 w-4" />
                Buscar
              </Button>

              <Button
                variant="outline"
                className="flex items-center gap-2 px-6 py-3 border-2 border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-300 rounded-xl font-medium"
                showArrow={false}
              >
                <Filter className="h-4 w-4" />
                Filtros
              </Button>

              <Button
                onClick={handleCreate}
                className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 transition-all duration-300 rounded-xl font-medium text-white border-0"
                showArrow={false}
              >
                <Plus className="h-5 w-5" />
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
                <p className="text-slate-500 mt-1">
                  Gerencie todas as viagens cadastradas
                </p>
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
            <ViagemTable
              viagens={viagensCompletas}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>
        </div>
      </div>

      <ViagemFormModal
        open={open}
        onClose={() => setOpen(false)}
        viagem={selected}
        caminhoes={[]} /// IMPLEMENTAR BUSCA DE CAMINHOES
        onSuccess={handleSuccess}
        motoristas={motoristas}
      />

      <ConfirmDeleteModal
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={confirmDelete}
        title="Remover Viagem"
        description="Tem certeza que deseja remover esta viagem? Esta ação não poderá ser desfeita."
      />
    </div>
  );
}
