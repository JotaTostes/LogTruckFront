import { Edit, Trash2 } from "lucide-react";
import { MTTypography as Typography } from "../../components/ui/mt/MTTypography";
import { MTCard as Card } from "../../components/ui/mt/MTCard";
import type {
  Caminhao,
  CaminhaoCompletos,
  UpdateCaminhaoDto,
} from "../../types/Caminhao";
import { formatarPlaca } from "../../utils/formatadores";

type Props = {
  caminhoes: Caminhao[];
  onEdit: (caminhao: UpdateCaminhaoDto) => void;
  onDelete: (id: string) => void;
};

export default function CaminhaoTable({ caminhoes, onEdit, onDelete }: Props) {
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <Typography variant="h5">Viagens Cadastradas</Typography>
      </div>

      <Card className="overflow-x-auto">
        <table className="min-w-full table-auto text-left">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2">Marca</th>
              <th className="p-2">Modelo</th>
              <th className="p-2">Ano</th>
              <th className="p-2">Placa</th>
              <th className="p-2">Capacidade</th>
            </tr>
          </thead>
          <tbody>
            {caminhoes.map((c) => (
              <tr key={c.id} className="border-b hover:bg-gray-50">
                <td className="p-2">{c.marca}</td>
                <td className="p-2">{c.modelo}</td>
                <td className="p-2">{c.ano}</td>
                <td className="p-2">{formatarPlaca(c.placa)}</td>
                <td className="p-2">{c.capacidadeToneladas} t</td>
                <td className="p-2">
                  <button
                    onClick={() => onEdit(c)}
                    className="text-blue-600 hover:text-blue-800 transition-colors mr-2"
                    title="Editar"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => c.id && onDelete(c.id)}
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
