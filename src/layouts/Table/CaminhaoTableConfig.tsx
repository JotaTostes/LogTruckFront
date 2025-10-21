import type { Caminhao } from "../../types/Caminhao";
import type { Column, ActionButton } from "../../components/ui/DataTable";
import { Edit, Trash2 } from "lucide-react";
import { formatarPlaca } from "../../utils/formatadores";

export const caminhaoColumns: Column<Caminhao>[] = [
  {
    key: "marca",
    label: "Marca",
    width: "25%",
  },
  {
    key: "modelo",
    label: "Modelo",
    width: "25%",
    filtrable: true,
  },
  {
    key: "ano",
    label: "Ano",
    width: "25%",
  },
  {
    key: "placa",
    label: "Placa",
    width: "25%",
    render: (item) => formatarPlaca(item.placa),
    filtrable: true,
  },
  {
    key: "capacidadeToneladas",
    label: "Capacidade (t)",
    width: "25%",
    render: (item) => `${item.capacidadeToneladas} t`,
  },
];

export const createCaminhaoActions = (
  onEdit: (motorista: Caminhao) => void,
  onDelete: (id: string) => void
): ActionButton<Caminhao>[] => [
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
