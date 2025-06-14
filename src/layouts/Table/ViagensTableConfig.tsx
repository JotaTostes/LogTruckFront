import { Edit, Trash2, DollarSign, Clock, Eye, Check } from "lucide-react";
import type { Column, ActionButton } from "../../components/ui/DataTable";
import type { ViagemCompletas } from "../../types/Viagem";
import { formatarPlaca } from "../../utils/formatadores";
import { getStatusText } from "../../utils/status";

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
    key: "motoristaNome",
    label: "Motorista",
    width: "20%",
    render: (item) => item.motoristaNome,
    filtrable: true,
  },
  {
    key: "caminhaoPlaca",
    label: "Caminhão",
    width: "10%",
    render: (item) => formatarPlaca(item.caminhaoPlaca || ""),
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
    width: "5%",
    render: (item) => `${item.quilometragem} km`,
  },
  {
    key: "valorFrete",
    label: "Valor Frete",
    width: "5%",
    render: (item) =>
      item.valorFrete.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      }),
  },
  {
    key: "dataSaida",
    label: "Data Saída",
    width: "5%",
    render: (item) => item.dataSaida,
  },
  {
    key: "statusNome",
    label: "Status",
    width: "5%",
    filtrable: true,
    render: (item) => getStatusText(item.status),
  },
];

export const aprovarViagemColumns: Column<ViagemCompletas>[] = [
  {
    key: "motorista",
    label: "Motorista",
    render: (item) => item.motoristaNome,
  },
  {
    key: "caminhao",
    label: "Caminhão",
    render: (item) => item.caminhaoPlaca,
  },
  {
    key: "origem",
    label: "Origem",
  },
  {
    key: "destino",
    label: "Destino",
  },
  {
    key: "valorFrete",
    label: "Valor Frete",
    render: (item) =>
      item.valorFrete.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      }),
  },
  {
    key: "dataSaida",
    label: "Data Saída",
  },
];

export const aprovarViagemActions = (
  setSelectedViagem: (viagem: ViagemCompletas) => void,
  handleAprovar: (id: string) => void
): ActionButton<any>[] => [
  {
    icon: <Eye className="h-4 w-4" />,
    onClick: setSelectedViagem,
    color: "blue-gray",
    title: "Visualizar Detalhes",
  },
  {
    icon: <Check className="h-4 w-4" />,
    onClick: (viagem) => handleAprovar(viagem.id),
    color: "green",
    title: "Aprovar Viagem",
  },
];
