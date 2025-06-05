import type { ViagemCompletas } from "../../../types/Viagem";
import FormModal from "../../../components/ui/FormModal";
import { Receipt } from "lucide-react";
import ViagemCustosForm from "./ViagemCustosForm";

type Props = {
  open: boolean;
  onClose: () => void;
  viagem: ViagemCompletas | null;
  onSuccess: () => void;
};

export function ViagemCustosFormModal({
  open,
  onClose,
  viagem,
  onSuccess,
}: Props) {
  if (!viagem) return null;

  return (
    <FormModal
      open={open}
      onClose={onClose}
      title="Registro de Custos"
      isEdit={false}
      icon={<Receipt className="h-6 w-6 text-white" />}
    >
      <ViagemCustosForm
        viagemId={viagem.id?.toString() || ""}
        onSuccess={onSuccess}
      />
    </FormModal>
  );
}
