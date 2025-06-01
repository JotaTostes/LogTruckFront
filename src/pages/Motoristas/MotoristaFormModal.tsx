import type { Motorista } from "../../types/Motorista";
import MotoristaForm from "./MotoristaForm";
import type { Usuario } from "../../types/Usuario";
import FormModal from "../../components/ui/FormModal";
import {UserPlus, Icon } from "lucide-react";
import { steeringWheel } from '@lucide/lab';

type Props = {
  open: boolean;
  onClose: () => void;
  motorista: Motorista | null;
  onSuccess: () => void;
  usuariosMotoristas: Usuario[];
};

export function MotoristaFormModal({ 
  open, 
  onClose, 
  motorista, 
  onSuccess,
  usuariosMotoristas 
}: {
  open: boolean;
  onClose: () => void;
  motorista: any;
  onSuccess: () => void;
  usuariosMotoristas: Usuario[];
}) {
  return (
    <FormModal
      open={open}
      onClose={onClose}
      title="Motorista"
      isEdit={!!motorista}
      icon={<Icon iconNode={steeringWheel} className="h-6 w-6 text-white" />}
    >
      <MotoristaForm motorista={motorista} onSuccess={onSuccess} usuariosMotoristas={usuariosMotoristas} />
    </FormModal>
  );
}

