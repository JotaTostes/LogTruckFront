import type { Motorista } from "../../types/Motorista";
import type { Column, ActionButton } from "../../components/ui/DataTable";
import { Edit, Trash2 } from "lucide-react";
import { formatarCPF } from "../../utils/formatadores";

export const motoristaColumns: Column<Motorista>[] = [
  {
    key: "nome",
    label: "Nome",
    width: "25%",
    filtrable: true,
  },
  {
    key: "cpf",
    label: "CPF",
    width: "25%",
    render: (item) => formatarCPF(item.cpf),
    filtrable: true,
  },
  {
    key: "cnh",
    label: "CNH",
    width: "25%",
  },
  {
    key: "telefone",
    label: "Telefone",
    width: "25%",
    filtrable: true,
  },
];

export const createMotoristaActions = (
  onEdit: (motorista: Motorista) => void,
  onDelete: (id: string) => void
): ActionButton<Motorista>[] => [
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
