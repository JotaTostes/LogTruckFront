import { Button } from "./Button";
import { Trash2, X } from "lucide-react";
import { useEffect } from "react";
import { systemTheme } from "../../config/systemTheme";

type ConfirmDeleteModalProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
};

export default function ConfirmDeleteModal({
  open,
  onClose,
  onConfirm,
  title = "Confirmar exclusão",
  description = "Tem certeza que deseja excluir este motorista? Esta ação não pode ser desfeita.",
}: ConfirmDeleteModalProps) {
  // Previne scroll quando modal está aberta
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    // Cleanup
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
          <div className="bg-red-50 p-4 rounded-full mb-4 border border-red-100">
            <Trash2 className="w-8 h-8 text-red-500" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">{title}</h2>
          <p className="text-gray-600 leading-relaxed">{description}</p>
        </div>

        {/* Botões de ação */}
        <div className="flex flex-col-reverse sm:flex-row gap-3 mt-8 justify-center">
          <Button
            variant="outline"
            size="md"
            onClick={onClose}
            showArrow={false}
            className="flex-1 sm:flex-none"
            icon={<X className="h-5 w-5" />}
          >
            Cancelar
          </Button>
          <Button
            size="md"
            onClick={onConfirm}
            showArrow={false}
            className="flex-1 sm:flex-none"
            icon={<Trash2 className="h-5 w-5" />}
            variant="success"
          >
            Confirmar
          </Button>
        </div>
      </div>
    </div>
  );
}
