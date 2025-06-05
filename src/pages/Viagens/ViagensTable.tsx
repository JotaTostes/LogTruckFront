import { Edit, Trash2, DollarSign, RefreshCcw } from "lucide-react";
import { MTTypography as Typography } from "../../components/ui/mt/MTTypography";
import { MTCard as Card } from "../../components/ui/mt/MTCard";
import type { Viagem, ViagemCompletas } from "../../types/Viagem";
import { formatarPlaca, formatarDataISO } from "../../utils/formatadores";

type Props = {
  viagens: ViagemCompletas[];
  onEdit: (viagem: ViagemCompletas) => void;
  onDelete: (id: string) => void;
  onStatusUpdate: (id: string, currentStatus: number) => void;
  onOpenCustosModal: (viagem: ViagemCompletas) => void;
};

export default function ViagemTable({
  viagens,
  onEdit,
  onDelete,
  onStatusUpdate,
  onOpenCustosModal,
}: Props) {
  const getStatusText = (status: number) => {
    switch (status) {
      case 1:
        return "Planejada";
      case 2:
        return "Em Andamento";
      case 3:
        return "Concluida";
      case 4:
        return "Cancelada";
      default:
        return "Desconhecido";
    }
  };

  const getStatusColor = (status: number) => {
    switch (status) {
      case 1:
        return "bg-yellow-500";
      case 2:
        return "bg-blue-500";
      case 3:
        return "bg-green-500";
      case 4:
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <Typography variant="h5">Viagens Cadastradas</Typography>
      </div>

      <Card className="overflow-x-auto">
        <table className="min-w-full table-auto text-left">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2">Motorista</th>
              <th className="p-2">Caminhão</th>
              <th className="p-2">Origem</th>
              <th className="p-2">Destino</th>
              <th className="p-2">Quilometragem</th>
              <th className="p-2">Valor Frete</th>
              <th className="p-2">Data Saída</th>
              <th className="p-2">Data Retorno</th>
              <th className="p-2">Status</th>
              <th className="p-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            {viagens.map((v) => (
              <tr key={v.id} className="border-b hover:bg-gray-50">
                <td className="p-2">{v.motorista?.nome}</td>
                <td className="p-2">{formatarPlaca(v.caminhao?.placa)}</td>
                <td className="p-2">{v.origem}</td>
                <td className="p-2">{v.destino}</td>
                <td className="p-2">{v.quilometragem} km</td>
                <td className="p-2">
                  {" "}
                  {v.valorFrete.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </td>
                <td className="p-2">{v.dataSaida}</td>
                <td className="p-2">{v.dataRetorno ? v.dataRetorno : "N/A"}</td>
                <td className="p-2">{getStatusText(v.status ?? 0)}</td>
                <td className="p-2">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onEdit(v)}
                      className="text-blue-600 hover:text-blue-800 p-1 rounded-md hover:bg-blue-100 transition-all"
                      title="Editar"
                    >
                      <Edit className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() =>
                        v.id && onStatusUpdate(v.id, v.status ?? 0)
                      }
                      className="text-yellow-600 hover:text-yellow-800 p-1 rounded-md hover:bg-yellow-100 transition-all flex items-center gap-1"
                      title="Alterar Status"
                    >
                      <div
                        className={`w-2 h-2 rounded-full ${getStatusColor(
                          v.status ?? 0
                        )}`}
                      />
                      <span className="text-xs font-medium">
                        {getStatusText(v.status ?? 0)}
                      </span>
                    </button>

                    <button
                      onClick={() => v.id && onOpenCustosModal(v)}
                      className="text-green-600 hover:text-green-800 p-1 rounded-md hover:bg-green-100 transition-all"
                      title="Adicionar Custos"
                    >
                      <DollarSign className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => v.id && onDelete(v.id)}
                      className="text-red-600 hover:text-red-800 p-1 rounded-md hover:bg-red-100 transition-all"
                      title="Excluir"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
