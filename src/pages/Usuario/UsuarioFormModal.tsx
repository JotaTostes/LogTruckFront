import UsuarioForm from "./UsuarioForm";
import type { Usuario } from "../../types/Usuario";
import { Button as CustomButton } from "../../components/ui/Button";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "../../components/ui/Dialog";

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
      placeholder=""
      onResize={() => {}}
      onResizeCapture={() => {}}
      onPointerEnterCapture={() => {}}
      onPointerLeaveCapture={() => {}}
    >
      <DialogHeader
        placeholder=""
        onResize={() => {}}
        onResizeCapture={() => {}}
        onPointerEnterCapture={() => {}}
        onPointerLeaveCapture={() => {}}
      >
        {usuario ? "Editar Usuário" : "Cadastrar Usuário"}
      </DialogHeader>

      <DialogBody
        className="overflow-auto max-h-[80vh]"
        placeholder=""
        onResize={() => {}}
        onResizeCapture={() => {}}
        onPointerEnterCapture={() => {}}
        onPointerLeaveCapture={() => {}}
      >
        <UsuarioForm usuario={usuario} onSuccess={onSuccess} />
      </DialogBody>

      <DialogFooter
        placeholder=""
        onResize={() => {}}
        onResizeCapture={() => {}}
        onPointerEnterCapture={() => {}}
        onPointerLeaveCapture={() => {}}
      >
        <CustomButton
          onClick={onClose}
          className="mr-1 bg-transparent text-red-600 hover:bg-red-50"
          showArrow={false}
        >
          Cancelar
        </CustomButton>
      </DialogFooter>
    </Dialog>
  );
}
