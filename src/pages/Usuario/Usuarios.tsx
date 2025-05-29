import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "../../components/ui/Button";
import { MTTypography as Typography } from "../../components/ui/mt/MTTypography";
import { useUsuarioStore } from "../../store/usuarioStore";
import UsuarioFormModal from "./UsuarioFormModal";
import UsuarioTable from "./UsuarioTable";
import type { Usuario } from "../../types/Usuario";
import toast from "react-hot-toast";

export default function Usuarios() {
  const { usuarios, carregarUsuarios, removerUsuario } = useUsuarioStore();
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Usuario | null>(null);

  useEffect(() => {
    carregarUsuarios();
  }, []);

  const handleCreate = () => {
    setSelected(null);
    setOpen(true);
  };

  const handleEdit = (usuario: Usuario) => {
    setSelected(usuario);
    setOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await removerUsuario(id);
      toast.success("Usuário removido com sucesso!");
      carregarUsuarios(); // recarrega a lista
    } catch (error) {
      toast.error("Erro ao remover usuário");
    }
  };

  const handleSuccess = () => {
    setOpen(false);
    carregarUsuarios();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <Typography variant="h2" color="blue-gray" className="font-bold">
          Usuários
        </Typography>

        <Button
          onClick={handleCreate}
          className="flex items-center gap-2"
          showArrow={false}
        >
          <Plus className="h-4 w-4" />
          Novo Usuário
        </Button>
      </div>

      <UsuarioTable
        usuarios={usuarios}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <UsuarioFormModal
        open={open}
        onClose={() => setOpen(false)}
        usuario={selected}
        onSuccess={handleSuccess}
      />
    </div>
  );
}
