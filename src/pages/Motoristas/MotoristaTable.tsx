import { Edit, Trash2 } from "lucide-react";
import { MTTypography as Typography } from "../../components/ui/mt/MTTypography";
import { Card } from "../../components/ui/mt/MTCard";
import type { Motorista } from "../../types/Motorista";
import { formatarCPF } from "../../utils/formatadores";

type Props = {
  motoristas: Motorista[];
  onEdit: (motorista: Motorista) => void;
  onDelete: (id: string) => void;
};

export default function MotoristaTable({
  motoristas,
  onEdit,
  onDelete,
}: Props) {
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <Typography variant="h5">Motoristas Cadastrados</Typography>
      </div>

      <Card className="overflow-x-auto">
        <table className="min-w-full table-auto text-left">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2">Nome</th>
              <th className="p-2">CPF</th>
              <th className="p-2">CNH</th>
              <th className="p-2">Telefone</th>
              <th className="p-2">Ativo</th>
              <th className="p-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            {motoristas.map((m) => (
              <tr key={m.id} className="border-b hover:bg-gray-50">
                <td className="p-2">{m.nome}</td>
                <td className="p-2">{formatarCPF(m.cpf)}</td>
                <td className="p-2">{m.cnh}</td>
                <td className="p-2">{m.telefone}</td>
                <td className="p-2">{m.ativo ? "Sim" : "Não"}</td>
                <td className="p-2 ">
                  <button
                    onClick={() => onEdit(m)}
                    className="text-blue-600 hover:text-blue-800 transition-colors"
                    title="Editar"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => m.id && onDelete(m.id)}
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
