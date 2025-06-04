import CaminhaoForm from "./CaminhaoForm";
import type { Caminhao } from "../../types/Caminhao";
import FormModal from "../../components/ui/FormModal";
import { Truck } from "lucide-react";

type Props = {
  open: boolean;
  onClose: () => void;
  caminhao: Caminhao | null;
  onSuccess: () => void;
};

export function CaminhaoFormModal({
  open,
  onClose,
  caminhao,
  onSuccess,
}: {
  open: boolean;
  onClose: () => void;
  caminhao: any;
  onSuccess: () => void;
}) {
  return (
    <FormModal
      open={open}
      onClose={onClose}
      title="Caminhão"
      isEdit={!!caminhao}
      icon={<Truck className="h-6 w-6 text-white" />}
    >
      <CaminhaoForm caminhao={caminhao} onSuccess={onSuccess} />
    </FormModal>
  );
}
