import { useEffect, useState } from "react";
import { Plus, Users, Search, Filter } from "lucide-react";
import toast from "react-hot-toast";

import { Button } from "../../components/ui/Button";
import { DataTable } from "../../components/ui/DataTable";
import ConfirmDeleteModal from "../../components/ui/ConfirmDeleteModal";
import { MTTypography as Typography } from "../../components/ui/mt/MTTypography";

import { useUsuarioStore } from "../../store/usuarioStore";

import { UsuarioFormModal } from "./UsuarioFormModal";
import {
  createUsuarioActions,
  usuarioColumns,
} from "../../layouts/Table/UsuarioTableConfig";

import type { Usuario } from "../../types/Usuario";
import { usuarioController } from "../../controllers/usuarioController";

export default function Usuarios() {
  const usuarios = useUsuarioStore((state) => state.usuarios);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    loadUsuarios();
  }, []);

  const loadUsuarios = async () => {
    setLoading(true);
    try {
      await usuarioController.fetchUsuarios();
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setSelected(null);
    setOpen(true);
  };

  const handleEdit = (usuario: Usuario) => {
    setSelected(usuario);
    setOpen(true);
  };

  const handleDelete = async (id: string) => {
    setDeleteId(id);
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    try {
      await usuarioController.deleteUsuario(deleteId);
    } catch (error) {
    } finally {
      setDeleteId(null);
    }
  };

  const handleSuccess = () => {
    setOpen(false);
    loadUsuarios();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      {/* Container Principal */}
      <div className="max-w-7xl mx-auto">
        {/* Header com glassmorphism */}
        <div className="bg-white/80 backdrop-blur-xl border border-white/20 rounded-3xl p-8 mb-8 shadow-xl shadow-blue-500/10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            {/* Título e Estatísticas */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur-xl opacity-30"></div>
                  <div className="relative bg-gradient-to-r from-blue-600 to-indigo-600 p-4 rounded-2xl">
                    <Users className="h-8 w-8 text-white" />
                  </div>
                </div>
                <div>
                  <Typography
                    variant="h1"
                    color="blue-gray"
                    className="font-bold text-3xl lg:text-4xl bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent"
                  >
                    Gerenciar Usuários
                  </Typography>
                  <p className="text-slate-500 mt-2 text-lg">
                    {loading
                      ? "Carregando..."
                      : `${usuarios.length} usuário${
                          usuarios.length !== 1 ? "s" : ""
                        } cadastrado${usuarios.length !== 1 ? "s" : ""}`}
                  </p>
                </div>
              </div>
            </div>

            {/* Ações */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={handleCreate}
                className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 transition-all duration-300 rounded-xl font-medium text-white border-0"
                showArrow={false}
                variant="secondary"
                icon={<Plus className="h-4 w-4" />}
              >
                Novo Usuário
              </Button>
            </div>
          </div>
        </div>

        {/* Área de Conteúdo Principal */}
        <div className="bg-white/90 backdrop-blur-xl border border-white/30 rounded-3xl shadow-2xl shadow-slate-200/50 overflow-hidden">
          {/* Header da Tabela */}
          <div className="bg-gradient-to-r from-slate-50 to-blue-50 px-8 py-6 border-b border-slate-200/50">
            <div className="flex items-center justify-between">
              <div>
                <Typography
                  variant="h3"
                  color="blue-gray"
                  className="font-semibold text-xl"
                >
                  Lista de Usuários
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

          {/* Conteúdo da Tabela */}
          <div className="p-8">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-16 space-y-4">
                <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                <p className="text-slate-500 font-medium">
                  Carregando usuários...
                </p>
              </div>
            ) : usuarios.length === 0 ? (
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
                    Nenhum usuário encontrado
                  </Typography>
                  {/* <p className="text-slate-500 mb-6">
                    Comece criando seu primeiro usuário no sistema
                  </p>
                  <Button
                    onClick={handleCreate}
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-blue-500/30 px-6 py-3 rounded-xl font-medium"
                    showArrow={false}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Criar Primeiro Usuário
                  </Button> */}
                </div>
              </div>
            ) : (
              <DataTable
                data={usuarios}
                columns={usuarioColumns}
                actions={createUsuarioActions(handleEdit, handleDelete)}
                title="Usuários Cadastrados"
                subtitle="Gerencie todos os usuários do sistema"
                loading={loading}
                filterPlaceholder="Buscar usuários..."
              />
            )}
          </div>
        </div>

        {/* Cards de Estatísticas Rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white/80 backdrop-blur-xl border border-white/30 rounded-2xl p-6 shadow-lg shadow-blue-500/5">
            <div className="flex items-center gap-4">
              <div className="bg-green-100 p-3 rounded-xl">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-slate-500 font-medium">
                  Total de Usuários
                </p>
                <p className="text-2xl font-bold text-slate-800">
                  {usuarios.length}
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
                  Usuários Ativos
                </p>
                <p className="text-2xl font-bold text-slate-800">
                  {usuarios.length}
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
                <p className="text-sm font-medium text-slate-600">Hoje</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <UsuarioFormModal
        open={open}
        onClose={() => setOpen(false)}
        usuario={selected}
        onSuccess={handleSuccess}
      />

      <ConfirmDeleteModal
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={confirmDelete}
        title="Excluir usuario"
        description="Tem certeza que deseja excluir este usuario?"
      />
    </div>
  );
}
