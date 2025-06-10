import { useEffect, useState } from "react";
import { Plus, Users, Search, Filter, Icon } from "lucide-react";
import { steeringWheel } from "@lucide/lab";
import toast from "react-hot-toast";

import { Button } from "../../components/ui/Button";
import ConfirmDeleteModal from "../../components/ui/ConfirmDeleteModal";
import { DataTable } from "../../components/ui/DataTable";
import { MTTypography as Typography } from "../../components/ui/mt/MTTypography";

import { useMotoristaStore } from "../../store/motoristaStore";
import { useUsuarioStore } from "../../store/usuarioStore";

import { MotoristaFormModal } from "./MotoristaFormModal";
import {
  createMotoristaActions,
  motoristaColumns,
} from "../../layouts/Table/MotoristaTableConfig";

import type { Motorista, MotoristaCompleto } from "../../types/Motorista";
import { MotoristaDetailsModal } from "./MotoristaDetailModal";

export default function Motoristas() {
  const {
    motoristas,
    motoristasCompletos,
    carregarMotoristas,
    removerMotorista,
    carregarMotoristasCompletos,
  } = useMotoristaStore();
  const { usuariosMotoristas, carregarUsuariosMotoristas } = useUsuarioStore();
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Motorista | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [selectedMotoristaForDetails, setSelectedViagemParaCustos] =
    useState<MotoristaCompleto | null>(null);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        await carregarMotoristas();
        await carregarUsuariosMotoristas();
        await carregarMotoristasCompletos();
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

  const handleEdit = (motorista: Motorista) => {
    setSelected(motorista);
    setOpen(true);
  };

  const handleDelete = async (id: string) => {
    setDeleteId(id);
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    try {
      await removerMotorista(deleteId);
      toast.success("Motorista removido com sucesso!");
      carregarMotoristas();
    } catch (error) {
      toast.error("Erro ao remover motorista");
    } finally {
      setDeleteId(null);
    }
  };

  const handleSuccess = () => {
    setOpen(false);
    carregarMotoristas();
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
                    {/* <Users className="h-8 w-8 text-white" /> */}
                    <Icon
                      iconNode={steeringWheel}
                      className="h-6 w-6 text-white"
                    />
                  </div>
                </div>
                <div>
                  <Typography
                    variant="h1"
                    color="blue-gray"
                    className="font-bold text-3xl lg:text-4xl bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent"
                  >
                    Gerenciar Motoristas
                  </Typography>
                  <p className="text-slate-500 mt-2 text-lg">
                    {loading
                      ? "Carregando..."
                      : `${motoristas.length} motorista${
                          motoristas.length !== 1 ? "s" : ""
                        } cadastrado${motoristas.length !== 1 ? "s" : ""}`}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={handleCreate}
                className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 transition-all duration-300 rounded-xl font-medium text-white border-0"
                showArrow={false}
                icon={<Plus className="h-4 w-4" />}
                variant="secondary"
              >
                Novo Motorista
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
                  Lista de Motoristas
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
            {loading ? (
              <div className="flex flex-col items-center justify-center py-16 space-y-4">
                <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                <p className="text-slate-500 font-medium">
                  Carregando motoristas...
                </p>
              </div>
            ) : motoristas.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="bg-gradient-to-br from-slate-100 to-slate-200 w-24 h-24 rounded-full mx-auto flex items-center justify-center">
                  <Users className="h-10 w-10 text-slate-400" />
                </div>
                <div>
                  <Typography
                    variant="h4"
                    color="blue-gray"
                    className="font-semibold mb-2"
                  >
                    Nenhum motorista encontrado
                  </Typography>
                  <p className="text-slate-500 mb-6">
                    Comece criando seu primeiro motorista no sistema
                  </p>
                  <Button
                    onClick={handleCreate}
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-blue-500/30 px-6 py-3 rounded-xl font-medium"
                    showArrow={false}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Criar Primeiro Motorista
                  </Button>
                </div>
              </div>
            ) : (
              <DataTable
                data={motoristasCompletos}
                columns={motoristaColumns}
                actions={createMotoristaActions(
                  handleEdit,
                  handleDelete,
                  setSelectedViagemParaCustos
                )}
                title="Motoristas Cadastrados"
                subtitle="Gerencie todos os motoristas do sistema"
                loading={loading}
                filterPlaceholder="Buscar motorista..."
              />
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white/80 backdrop-blur-xl border border-white/30 rounded-2xl p-6 shadow-lg shadow-blue-500/5">
            <div className="flex items-center gap-4">
              <div className="bg-green-100 p-3 rounded-xl">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-slate-500 font-medium">
                  Total de Motoristas
                </p>
                <p className="text-2xl font-bold text-slate-800">
                  {motoristas.length}
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
                  Motoristas Ativos
                </p>
                <p className="text-2xl font-bold text-slate-800">
                  {motoristas.length}
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
                  Outros Dados
                </p>
                <p className="text-2xl font-bold text-slate-800">--</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <MotoristaFormModal
        open={open}
        onClose={() => setOpen(false)}
        motorista={selected}
        onSuccess={handleSuccess}
        usuariosMotoristas={usuariosMotoristas}
      />

      <ConfirmDeleteModal
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={confirmDelete}
        title="Excluir motorista"
        description="Tem certeza que deseja excluir este motorista?"
      />

      <MotoristaDetailsModal
        open={!!selectedMotoristaForDetails}
        onClose={() => setSelectedViagemParaCustos(null)}
        motorista={selectedMotoristaForDetails}
      />
    </div>
  );
}
