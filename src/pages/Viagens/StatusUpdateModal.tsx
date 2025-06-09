import { Clock, X } from "lucide-react";
import { Button } from "../../components/ui/Button";
import { useEffect } from "react";

type StatusUpdateModalProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: (newStatus: number) => void;
  currentStatus: number;
};

const statusOptions = [
  { id: 1, label: "Planejada", color: "bg-yellow-500" },
  { id: 2, label: "Em Andamento", color: "bg-blue-500" },
  { id: 3, label: "Concluída", color: "bg-green-500" },
  { id: 4, label: "Cancelada", color: "bg-red-500" },
];

export function StatusUpdateModal({
  open,
  onClose,
  onConfirm,
  currentStatus,
}: StatusUpdateModalProps) {
  // Previne scroll quando modal está aberta
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  // ESC para fechar
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (open) {
      document.addEventListener("keydown", handleEsc);
    }
    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl p-8 shadow-2xl max-w-md w-full animate-in fade-in-0 zoom-in-95 duration-300">
        {/* Botão de fechar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-red-100 transition-colors"
        >
          <X className="w-4 h-4 text-gray-500" />
        </button>

        {/* Header com ícone e título */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="bg-blue-50 p-4 rounded-full mb-4 border border-blue-100">
            <Clock className="w-8 h-8 text-blue-500" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Atualizar Status da Viagem
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Selecione o novo status para esta viagem
          </p>
        </div>

        {/* Status Options Grid */}
        <div className="grid grid-cols-2 gap-4 mt-6">
          {statusOptions.map((status) => (
            <button
              key={status.id}
              onClick={() => onConfirm(status.id)}
              disabled={status.id === currentStatus}
              className={`p-4 rounded-xl border-2 transition-all ${
                status.id === currentStatus
                  ? "border-blue-200 bg-blue-50 cursor-not-allowed"
                  : "border-gray-200 hover:border-blue-500 hover:bg-blue-50"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${status.color}`} />
                <span className="font-medium text-gray-700">
                  {status.label}
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Botões de ação */}
        <div className="flex flex-col-reverse sm:flex-row gap-3 mt-8 justify-center">
          <Button
            variant="outline"
            size="md"
            onClick={onClose}
            showArrow={false}
            className="flex-1"
            icon={<X className="h-5 w-5" />}
          >
            Cancelar
          </Button>
        </div>
      </div>
    </div>
  );
}
