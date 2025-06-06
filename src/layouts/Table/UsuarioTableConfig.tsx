import type { Usuario } from "../../types/Usuario";
import type { Column, ActionButton } from "../../components/ui/DataTable";
import { Edit, Trash2 } from "lucide-react";

export const usuarioColumns: Column<Usuario>[] = [
  {
    key: "nome",
    label: "Nome",
    width: "25%",
  },
  {
    key: "email",
    label: "Email",
    width: "25%",
  },
  {
    key: "cpf",
    label: "CPF",
    width: "25%",
  },
  {
    key: "role",
    label: "Função",
    width: "25%",
    render: (item) => item.role,
  },
];

export const createUsuarioActions = (
  onEdit: (usuario: Usuario) => void,
  onDelete: (id: string) => void
): ActionButton<Usuario>[] => [
  {
    icon: <Edit className="h-4 w-4" />,
    onClick: onEdit,
    color: "blue",
    title: "Editar",
  },
  {
    icon: <Trash2 className="h-4 w-4" />,
    onClick: (usuario) => usuario.id && onDelete(usuario.id),
    color: "red",
    title: "Excluir",
  },
];
