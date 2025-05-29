import UsuarioForm from "./UsuarioForm";
import type { Usuario } from "../../types/Usuario";
import { Button as CustomButton } from "../../components/ui/Button";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "../../components/ui/Dialog";
import { MTTypography as Typography } from "../../components/ui/mt/MTTypography";

type Props = {
  open: boolean;
  onClose: () => void;
  usuario: Usuario | null;
  onSuccess: () => void;
};

export default function UsuarioFormModal({
  open,
  onClose,
  usuario,
  onSuccess,
}: Props) {
  return (
    <Dialog
      open={open}
      handler={onClose}
      size="md"
      className="bg-white rounded-xl shadow-lg"
    >
      <DialogHeader className="pb-2 border-b border-gray-200">
        <Typography variant="h4" color="blue-gray">
          {usuario ? "Editar Usuário" : "Novo Usuário"}
        </Typography>
      </DialogHeader>

      <DialogBody className="px-6 py-4 overflow-auto max-h-[80vh]">
        <UsuarioForm usuario={usuario} onSuccess={onSuccess} />
      </DialogBody>

      <DialogFooter className="px-6 py-3 border-t border-gray-200 flex justify-end">
        <CustomButton
          onClick={onClose}
          className="bg-transparent text-red-600 hover:bg-red-50 font-semibold"
          showArrow={false}
        >
          Cancelar
        </CustomButton>
      </DialogFooter>
    </Dialog>
  );
}
