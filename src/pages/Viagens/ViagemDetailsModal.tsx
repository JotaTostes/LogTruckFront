import { Eye, Truck, User, MapPin, DollarSign, Receipt } from "lucide-react";
import FormModal from "../../components/ui/FormModal";
import { MTTypography as Typography } from "../../components/ui/mt/MTTypography";
import type { ViagemCompletas } from "../../types/Viagem";
import { formatarPlaca } from "../../utils/formatadores";
import {
  getStatusText,
  getStatusColor,
  getTextTipoCusto,
} from "../../utils/status";

type Props = {
  open: boolean;
  onClose: () => void;
  viagem: ViagemCompletas | null;
};

export function ViagemDetailsModal({ open, onClose, viagem }: Props) {
  if (!viagem) return null;

  return (
    <FormModal
      open={open}
      onClose={onClose}
      title="Detalhes da Viagem"
      isEdit={false}
      mode="view"
      icon={<Eye className="h-6 w-6 text-white" />}
    >
      <div className="space-y-6">
        {/* Informações do Motorista */}
        <div className="bg-blue-50 rounded-xl p-4">
          <div className="flex items-center gap-3 mb-2">
            <User className="h-5 w-5 text-blue-600" />
            <Typography variant="h6">Motorista</Typography>
          </div>
          <div className="space-y-1">
            <Typography>Nome: {viagem.motorista?.nome}</Typography>
            <Typography>CNH: {viagem.motorista?.cnh}</Typography>
            <Typography>Telefone: {viagem.motorista?.telefone}</Typography>
          </div>
        </div>

        {/* Informações do Caminhão */}
        <div className="bg-indigo-50 rounded-xl p-4">
          <div className="flex items-center gap-3 mb-2">
            <Truck className="h-5 w-5 text-indigo-600" />
            <Typography variant="h6">Caminhão</Typography>
          </div>
          <div className="space-y-1">
            <Typography>
              Placa: {formatarPlaca(viagem.caminhao?.placa)}
            </Typography>
            <Typography>Modelo: {viagem.caminhao?.modelo}</Typography>
            <Typography>Marca: {viagem.caminhao?.marca}</Typography>
          </div>
        </div>

        {/* Detalhes da Viagem */}
        <div className="bg-blue-gray-50 rounded-xl p-4">
          <div className="flex items-center gap-3 mb-2">
            <MapPin className="h-5 w-5 text-blue-gray-600" />
            <Typography variant="h6">Detalhes da Viagem</Typography>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <Typography>Origem: {viagem.origem}</Typography>
              <Typography>Destino: {viagem.destino}</Typography>
              <Typography>Quilometragem: {viagem.quilometragem} km</Typography>
            </div>
            <div className="space-y-1">
              <Typography>Data Saída: {viagem.dataSaida}</Typography>
              {viagem.dataRetorno && (
                <Typography>Data Retorno: {viagem.dataRetorno}</Typography>
              )}
              <div className="flex items-center gap-2">
                <div
                  className={`w-2 h-2 rounded-full ${getStatusColor(
                    viagem.status ?? 0
                  )}`}
                />
                <Typography>{getStatusText(viagem.status ?? 0)}</Typography>
              </div>
            </div>
          </div>
        </div>

        {/* Custos da Viagem */}
        {viagem.custos && viagem.custos.length > 0 && (
          <div className="bg-green-50 rounded-xl p-4">
            <div className="flex items-center gap-3 mb-2">
              <Receipt className="h-5 w-5 text-green-600" />
              <Typography variant="h6">Custos da Viagem</Typography>
            </div>
            <div className="space-y-2">
              {viagem.custos.map((custo) => (
                <div
                  key={custo.id}
                  className="flex justify-between items-center p-2 bg-white rounded-lg"
                >
                  <div>
                    <Typography className="font-medium">
                      {getTextTipoCusto(custo.tipo)}
                    </Typography>
                    <Typography variant="small" color="gray">
                      {custo.descricao}
                    </Typography>
                  </div>
                  <Typography>
                    {custo.valor.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </Typography>
                </div>
              ))}
            </div>
            <div className="mt-4 flex justify-between items-center border-t pt-2">
              <Typography className="font-medium">Total de custos:</Typography>
              <Typography className="font-medium">
                {viagem.custos
                  .reduce((total, custo) => total + custo.valor, 0)
                  .toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
              </Typography>
            </div>
          </div>
        )}

        {/* Comissão */}
        {viagem.comissao && (
          <div className="bg-amber-50 rounded-xl p-4">
            <div className="flex items-center gap-3 mb-2">
              <DollarSign className="h-5 w-5 text-amber-600" />
              <Typography variant="h6">Comissão</Typography>
            </div>
            <div className="space-y-1">
              <Typography>
                Valor:{" "}
                {viagem.comissao.valorCalculado.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </Typography>
              <Typography>Percentual: {viagem.comissao.percentual}%</Typography>
            </div>
          </div>
        )}
      </div>
    </FormModal>
  );
}
