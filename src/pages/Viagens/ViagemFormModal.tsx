import type { Motorista } from "../../types/Motorista";
import type { Caminhao } from "../../types/Caminhao";
import FormModal from "../../components/ui/FormModal";
import { MapPlus } from "lucide-react";
import ViagemForm from "./ViagemForm";

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
      title="Registro de Viagem"
      isEdit={!!viagem}
      icon={<MapPlus className="h-6 w-6 text-white" />}
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
