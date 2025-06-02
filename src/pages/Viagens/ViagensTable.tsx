import { Edit, Trash2 } from "lucide-react";
import { MTTypography as Typography } from "../../components/ui/mt/MTTypography";
import { MTCard as Card } from "../../components/ui/mt/MTCard";
import type { Viagem, ViagemCompletas } from "../../types/Viagem";

type Props = {
  viagens: ViagemCompletas[];
  onEdit: (viagem: ViagemCompletas) => void;
  onDelete: (id: string) => void;
};

export default function ViagemTable({ viagens, onEdit, onDelete }: Props) {
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
              <th className="p-2">Status</th>
              <th className="p-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            {viagens.map((v) => (
              <tr key={v.id} className="border-b hover:bg-gray-50">
                <td className="p-2">{v.motorista?.nome}</td>
                <td className="p-2">{v.caminhao?.placa}</td>
                <td className="p-2">{v.origem}</td>
                <td className="p-2">{v.destino}</td>
                <td className="p-2">{v.quilometragem} km</td>
                <td className="p-2">R$ {v.valorFrete.toFixed(2)}</td>
                <td className="p-2">
                  {new Date(v.dataSaida).toLocaleDateString()}
                </td>
                <td className="p-2">{getStatusText(v.status ?? 0)}</td>
                <td className="p-2">
                  <button
                    onClick={() => onEdit(v)}
                    className="text-blue-600 hover:text-blue-800 transition-colors mr-2"
                    title="Editar"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => v.id && onDelete(v.id)}
                    className="text-red-600 hover:text-red-800 transition-colors"
                    title="Excluir"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
