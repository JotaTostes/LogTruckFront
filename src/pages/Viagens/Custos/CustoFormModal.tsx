import type { ViagemCompletas } from "../../../types/Viagem";
import type {
  CustoViagemCompletoDto,
  CustoViagemPayload,
} from "../../../types/CustoViagem";
import FormModal from "../../../components/ui/FormModal";
import { DollarSign } from "lucide-react";
import ViagemCustosForm from "./ViagemCustosForm";

type ModalMode = "edit" | "create";

type Props = {
  open: boolean;
  onClose: () => void;
  mode: ModalMode;
  viagem: ViagemCompletas | null;
  custo?: CustoViagemCompletoDto | null;
  onSave: (custo: CustoViagemPayload) => void;
  onSuccess?: () => void;
};

export function CustoFormModal({
  open,
  onClose,
  mode,
  viagem,
  custo,
  onSave,
  onSuccess,
}: Props) {
  if (!viagem) return null;

  return (
    <FormModal
      open={open}
      onClose={onClose}
      title="Custo"
      subtitle={
        mode === "edit"
          ? "Atualize as informações do custo"
          : "Preencha os dados para criar um novo custo"
      }
      icon={<DollarSign className="h-6 w-6 text-white" />}
      isEdit={mode === "edit"}
    >
      <ViagemCustosForm
        viagemId={viagem.id?.toString() || ""}
        onSuccess={onSuccess ?? (() => {})}
      />
    </FormModal>
  );
}

export default CustoFormModal;
