import { Edit, Trash2, DollarSign, Clock, Eye } from "lucide-react";
import type { Column, ActionButton } from "../../components/ui/DataTable";
import type { ViagemCompletas } from "../../types/Viagem";
import { formatarPlaca } from "../../utils/formatadores";

export const createViagemActions = (
  onEdit: (viagem: ViagemCompletas) => void,
  onDelete: (id: string) => void,
  onStatusUpdate: (viagem: ViagemCompletas) => void,
  onOpenCustos: (viagem: ViagemCompletas) => void,
  onViewDetails: (viagem: ViagemCompletas) => void
): ActionButton<ViagemCompletas>[] => [
  {
    icon: <Eye className="h-4 w-4" />,
    onClick: onViewDetails,
    color: "blue-gray",
    title: "Visualizar Detalhes",
  },
  {
    icon: <Edit className="h-4 w-4" />,
    onClick: onEdit,
    color: "blue",
    title: "Editar",
  },
  {
    icon: <Clock className="h-4 w-4" />,
    onClick: onStatusUpdate,
    color: "amber",
    title: "Alterar Status",
  },
  {
    icon: <DollarSign className="h-4 w-4" />,
    onClick: onOpenCustos,
    color: "green",
    title: "Adicionar Custos",
  },
  {
    icon: <Trash2 className="h-4 w-4" />,
    onClick: (viagem) => viagem.id && onDelete(viagem.id),
    color: "red",
    title: "Excluir",
  },
];

export const viagemColumns: Column<ViagemCompletas>[] = [
  {
    key: "motorista",
    label: "Motorista",
    width: "15%",
    render: (item) => item.motorista?.nome,
    filtrable: true,
  },
  {
    key: "caminhao",
    label: "Caminhão",
    width: "10%",
    render: (item) => formatarPlaca(item.caminhao?.placa),
    filtrable: true,
  },
  {
    key: "origem",
    label: "Origem",
    width: "15%",
  },
  {
    key: "destino",
    label: "Destino",
    width: "15%",
  },
  {
    key: "quilometragem",
    label: "Quilometragem",
    width: "10%",
    render: (item) => `${item.quilometragem} km`,
  },
  {
    key: "valorFrete",
    label: "Valor Frete",
    width: "10%",
    render: (item) =>
      item.valorFrete.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      }),
  },
  {
    key: "dataSaida",
    label: "Data Saída",
    width: "10%",
    render: (item) => item.dataSaida,
  },
];
