import MotoristaForm from "./MotoristaForm";
import type { UsuarioDto } from "../../types/Usuario";
import FormModal from "../../components/ui/FormModal";
import { Icon } from "lucide-react";
import { steeringWheel } from "@lucide/lab";

export function MotoristaFormModal({
  open,
  onClose,
  motorista,
  onSuccess,
  usuariosMotoristas,
}: {
  open: boolean;
  onClose: () => void;
  motorista: any;
  onSuccess: () => void;
  usuariosMotoristas: UsuarioDto[];
}) {
  return (
    <FormModal
      open={open}
      onClose={onClose}
      title="Motorista"
      isEdit={!!motorista}
      icon={<Icon iconNode={steeringWheel} className="h-6 w-6 text-white" />}
    >
      <MotoristaForm
        motorista={motorista}
        onSuccess={onSuccess}
        usuariosMotoristas={usuariosMotoristas}
      />
    </FormModal>
  );
}
