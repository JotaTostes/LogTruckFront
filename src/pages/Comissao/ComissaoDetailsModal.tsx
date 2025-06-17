import { Receipt } from "lucide-react";
import FormModal from "../../components/ui/FormModal";
import { MTTypography as Typography } from "../../components/ui/mt/MTTypography";
import type { ComissaoCompleta } from "../../types/Comissao";
import { getStatusText, getStatusColor } from "../../utils/status";
type Props = {
  open: boolean;
  onClose: () => void;
  comissao: ComissaoCompleta | null;
  comissoes: ComissaoCompleta[] | null;
};

export function ComissaoDetailsModal({
  open,
  onClose,
  comissao,
  comissoes,
}: Props) {
  if (!comissao) return null;

  return (
    <FormModal
      open={open}
      onClose={onClose}
      title="Detalhes da Comissão"
      mode="view"
      icon={<Receipt className="h-6 w-6 text-white" />}
    >
      <div className="space-y-6">
        <div className="bg-indigo-50 rounded-xl p-4">
          <div className="flex items-center gap-3 mb-2">
            <Receipt className="h-5 w-5 text-indigo-600" />
            <Typography variant="h6">Detalhes da Comissão</Typography>
          </div>
          <div className="space-y-2">
            {comissoes
              ?.filter((detalhe) => detalhe.id === comissao.id)
              .map((detalhe) => (
                <div
                  key={detalhe.id}
                  className="bg-white rounded-lg p-3 shadow-sm space-y-2"
                >
                  <div className="flex justify-between items-center">
                    <Typography className="font-medium">
                      {detalhe.viagem.origem} → {detalhe.viagem.destino}
                    </Typography>
                    <Typography className="text-green-600 font-semibold">
                      {detalhe.valorCalculado.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </Typography>
                  </div>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Data Viagem: {detalhe.viagem.dataSaida}</span>

                    <span>Percentual: {detalhe.percentual}%</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>
                      Data Retorno: {detalhe.viagem.dataRetorno || "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>
                      Status da viagem:{" "}
                      <span
                        className={`px-2 py-1 rounded-full font-medium text-white ${getStatusColor(
                          detalhe.viagem.status
                        )}`}
                        style={{
                          backgroundColor: getStatusColor(
                            detalhe.viagem.status
                          ),
                        }}
                      >
                        {getStatusText(detalhe.viagem.status)}
                      </span>
                    </span>
                    <span>
                      Valor do Frete:{" "}
                      {detalhe.viagem.valorFrete?.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </FormModal>
  );
}
