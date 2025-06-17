import { Edit3, Trash2 } from "lucide-react";
import type { Column, ActionButton } from "../../components/ui/DataTable";
import type {
  CustoViagem,
  CustoViagemCompletoDto,
} from "../../types/CustoViagem";

export const custoViagemColumns: Column<CustoViagemCompletoDto>[] = [
  {
    key: "viagem",
    label: "Viagem",
    render: (item) => item.viagem.origem + " → " + item.viagem.destino,
    width: "25%",
    filtrable: true,
  },
  {
    key: "tipo",
    label: "Tipo de Custo",
    render: (item) => item.tipo,
    width: "20%",
    filtrable: true,
  },
  {
    key: "valor",
    label: "Valor",
    render: (item) => `R$ ${item.valor.toFixed(2)}`,
    width: "20%",
  },
  {
    key: "data",
    label: "Data",
    render: (item) => item.descricao,
    width: "20%",
  },
];

export const CustoViagemActions = (
  onEdit: (custo: CustoViagem) => void,
  onDelete: (custo: CustoViagem) => void
): ActionButton<CustoViagem>[] => [
  {
    icon: <Edit3 className="w-4 h-4" />,
    onClick: onEdit,
    color: "blue",
    title: "Editar",
  },
  {
    icon: <Trash2 className="w-4 h-4" />,
    onClick: onDelete,
    color: "red",
    title: "Excluir",
  },
];
