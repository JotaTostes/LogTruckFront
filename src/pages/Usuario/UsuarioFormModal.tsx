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
import { X } from "lucide-react";

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
      className="bg-white rounded-2xl shadow-2xl p-0"
    >
      <div className="flex justify-between items-center px-6 pt-6 pb-2 border-b border-gray-200">
        <Typography variant="h4" color="blue-gray">
          {usuario ? "Editar Usuário" : "Novo Usuário"}
        </Typography>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-red-500 transition"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <DialogBody className="px-6 py-4 overflow-auto max-h-[80vh]">
        <UsuarioForm usuario={usuario} onSuccess={onSuccess} />
      </DialogBody>

      <DialogFooter className="px-6 py-4 border-t border-gray-200">
        <CustomButton
          onClick={onClose}
          className="bg-red-50 text-red-600 hover:bg-red-100 font-medium"
          showArrow={false}
        >
          Cancelar
        </CustomButton>
      </DialogFooter>
    </Dialog>
  );
}
