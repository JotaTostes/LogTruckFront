import UsuarioForm from "./UsuarioForm";
import type { Usuario } from "../../types/Usuario";
import FormModal from "../../components/ui/FormModal";
import { UserPlus } from "lucide-react";

type Props = {
  open: boolean;
  onClose: () => void;
  usuario: Usuario | null;
  onSuccess: () => void;
};

export function UsuarioFormModal({
  open,
  onClose,
  usuario,
  onSuccess,
}: {
  open: boolean;
  onClose: () => void;
  usuario: any;
  onSuccess: () => void;
}) {
  return (
    <FormModal
      open={open}
      onClose={onClose}
      title="Usuário"
      isEdit={!!usuario}
      icon={<UserPlus className="h-6 w-6 text-white" />}
    >
      <UsuarioForm usuario={usuario} onSuccess={onSuccess} />
    </FormModal>
  );
}
