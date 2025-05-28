import { useEffect, useState } from "react";
import { Button as CustomButton } from "../../components/ui/Button";
import { MTTypography as Typography } from "../../components/ui/mt/MTTypography";
import { MTCard as Card } from "../../components/ui/mt/MTCard";
import type { Usuario } from "../../types/Usuario";
import { useUsuarioStore } from "../../store/usuarioStore";
import UsuarioFormModal from "./UsuarioFormModal";

export default function UsuarioTable() {
  const { usuarios, carregarUsuarios } = useUsuarioStore();
  const [selected, setSelected] = useState<Usuario | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    carregarUsuarios();
  }, []);

  const handleSuccess = () => {
    setOpen(false);
    carregarUsuarios();
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <Typography variant="h5">Usuários Cadastrados</Typography>
        <CustomButton
          onClick={() => {
            setSelected(null);
            setOpen(true);
          }}
        >
          Novo Usuário
        </CustomButton>
      </div>

      <Card className="overflow-x-auto">
        <table className="min-w-full table-auto text-left">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2">Nome</th>
              <th className="p-2">Email</th>
              <th className="p-2">CPF</th>
              <th className="p-2">Role</th>
              <th className="p-2">Ativo</th>
              <th className="p-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((u) => (
              <tr key={u.id} className="border-b hover:bg-gray-50">
                <td className="p-2">{u.nome}</td>
                <td className="p-2">{u.email}</td>
                <td className="p-2">{u.cpf}</td>
                <td className="p-2">{u.role}</td>
                <td className="p-2">{u.ativo ? "Sim" : "Não"}</td>
                <td className="p-2">
                  <CustomButton
                    onClick={() => {
                      setSelected(u);
                      setOpen(true);
                    }}
                    className="w-auto px-4 py-2 text-sm"
                    showArrow={false}
                  >
                    Editar
                  </CustomButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <UsuarioFormModal
        open={open}
        onClose={() => setOpen(false)}
        usuario={selected}
        onSuccess={handleSuccess}
      />
    </div>
  );
}
