import { useEffect, useState } from "react";
import { Plus, Truck, Search, Filter } from "lucide-react";
import toast from "react-hot-toast";

import { Button } from "../../components/ui/Button";
import ConfirmDeleteModal from "../../components/ui/ConfirmDeleteModal";
import { MTTypography as Typography } from "../../components/ui/mt/MTTypography";

import { useCaminhaoStore } from "../../store/caminhaoStore";
import { caminhaoController } from "../../controllers/caminhaoController";

import { CaminhaoFormModal } from "./CaminhaoFormModal";
import { DataTable } from "../../components/ui/DataTable";
import {
  caminhaoColumns,
  createCaminhaoActions,
} from "../../layouts/Table/CaminhaoTableConfig";

import type { Caminhao, UpdateCaminhaoDto } from "../../types/Caminhao";

export default function Caminhao() {
  const caminhoes = useCaminhaoStore((state) => state.caminhoes);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<UpdateCaminhaoDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    loadCaminhoes();
  }, []);

  const loadCaminhoes = async () => {
    setLoading(true);
    try {
      await caminhaoController.fetchCaminhoes();
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setSelected(null);
    setOpen(true);
  };

  const handleEdit = (caminhao: UpdateCaminhaoDto) => {
    setSelected(caminhao);
    setOpen(true);
  };

  const handleDelete = (id: string) => {
    setDeleteId(id);
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    try {
      await caminhaoController.deleteCaminhao(deleteId);
      loadCaminhoes();
    } catch (error) {
    } finally {
      setDeleteId(null);
    }
  };

  const handleSuccess = () => {
    setOpen(false);
    loadCaminhoes();
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
                    <Truck className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div>
                  <Typography
                    variant="h1"
                    color="blue-gray"
                    className="font-bold text-3xl lg:text-4xl bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent"
                  >
                    Gerenciar Caminhões
                  </Typography>
                  <p className="text-slate-500 mt-2 text-lg">
                    {loading
                      ? "Carregando..."
                      : `${caminhoes.length} ${
                          caminhoes.length === 1
                            ? "caminhão cadastrado"
                            : "caminhões cadastrados"
                        }`}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                icon={<Plus className="h-4 w-4" />}
                variant="secondary"
                onClick={handleCreate}
                className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 transition-all duration-300 rounded-xl font-medium text-white border-0"
                showArrow={false}
              >
                Novo Caminhão
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
                  Lista de Caminhões
                </Typography>
              </div>
              {loading && (
                <div className="flex items-center gap-2 text-blue-600">
                  <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-sm font-medium">
                    Carregando Caminhões...
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="p-8">
            {caminhoes.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="bg-gradient-to-br from-slate-100 to-slate-200 w-24 h-24 rounded-full mx-auto flex items-center justify-center">
                  <Truck className="h-10 w-10 text-slate-400" />
                </div>
                <div>
                  <Typography
                    variant="h4"
                    color="blue-gray"
                    className="font-semibold mb-2"
                  >
                    Nenhum caminhão encontrado
                  </Typography>
                  <p className="text-slate-500 mb-6">
                    Comece criando seu primeiro caminhão no sistema
                  </p>
                  <Button
                    onClick={handleCreate}
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-blue-500/30 px-6 py-3 rounded-xl font-medium"
                    showArrow={false}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Criar Primeiro Caminhão
                  </Button>
                </div>
              </div>
            ) : (
              <DataTable
                data={caminhoes}
                columns={caminhaoColumns}
                actions={createCaminhaoActions(handleEdit, handleDelete)}
                title="Caminhões Cadastrados"
                subtitle="Gerencie todos os caminhões do sistema"
                loading={loading}
                filterPlaceholder="Buscar caminhão..."
              />
            )}
          </div>
        </div>
      </div>

      <CaminhaoFormModal
        open={open}
        onClose={() => setOpen(false)}
        caminhao={selected}
        onSuccess={handleSuccess}
      />

      <ConfirmDeleteModal
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={confirmDelete}
        title="Remover Caminhão"
        description="Tem certeza que deseja remover este caminhão? Esta ação não poderá ser desfeita."
      />
    </div>
  );
}
