import type { Viagem } from "../../types/Viagem";
import type { Motorista } from "../../types/Motorista";
import type { Caminhao } from "../../types/Caminhao";
import FormModal from "../../components/ui/FormModal";
import { MapPinPlus, Icon } from "lucide-react";
import ViagemForm from "./ViagemForm";

type Props = {
  open: boolean;
  onClose: () => void;
  viagem: Viagem | null;
  onSuccess: () => void;
  motoristas: Motorista[];
  caminhoes: Caminhao[];
};

export function ViagemFormModal({
  open,
  onClose,
  viagem,
  onSuccess,
  caminhoes,
  motoristas,
}: {
  open: boolean;
  onClose: () => void;
  viagem: any;
  onSuccess: () => void;
  motoristas: Motorista[];
  caminhoes: Caminhao[];
}) {
  return (
    <FormModal
      open={open}
      onClose={onClose}
      title="Motorista"
      isEdit={!!viagem}
      icon={<MapPinPlus className="h-6 w-6 text-white" />}
    >
      <ViagemForm
        viagem={viagem}
        onSuccess={onSuccess}
        motoristas={motoristas}
        caminhoes={caminhoes}
      />
    </FormModal>
  );
}
