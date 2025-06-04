import { Edit, Trash2 } from "lucide-react";
import { MTTypography as Typography } from "../../components/ui/mt/MTTypography";
import { MTCard as Card } from "../../components/ui/mt/MTCard";
import type { Usuario } from "../../types/Usuario";
import { formatarCPF } from "../../utils/formatadores";

type Props = {
  usuarios: Usuario[];
  onEdit: (usuario: Usuario) => void;
  onDelete: (id: string) => void;
};

export default function UsuarioTable({ usuarios, onEdit, onDelete }: Props) {
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <Typography variant="h5">Usuários Cadastrados</Typography>
      </div>

      <Card className="overflow-x-auto">
        <table className="min-w-full table-auto text-left">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2">Nome</th>
              <th className="p-2">Email</th>
              <th className="p-2">CPF</th>
              <th className="p-2">Função</th>
              <th className="p-2">Ativo</th>
              <th className="p-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((u) => (
              <tr key={u.id} className="border-b hover:bg-gray-50">
                <td className="p-2">{u.nome}</td>
                <td className="p-2">{u.email}</td>
                <td className="p-2">{formatarCPF(u.cpf)}</td>
                <td className="p-2">{u.role}</td>
                <td className="p-2">{u.ativo ? "Sim" : "Não"}</td>
                <td className="p-2 ">
                  <button
                    onClick={() => onEdit(u)}
                    className="text-blue-600 hover:text-blue-800 transition-colors"
                    title="Editar"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => onDelete(u.id)}
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
