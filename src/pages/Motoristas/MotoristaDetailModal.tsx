import { Eye, User, MapPin, Receipt } from "lucide-react";
import FormModal from "../../components/ui/FormModal";
import { MTTypography as Typography } from "../../components/ui/mt/MTTypography";
import { formatarCPF } from "../../utils/formatadores";
import type { MotoristaCompleto } from "../../types/Motorista";

interface Props {
  open: boolean;
  onClose: () => void;
  motorista: MotoristaCompleto | null;
}

export function MotoristaDetailsModal({ open, onClose, motorista }: Props) {
  if (!motorista) return null;

  const totalViagens = motorista.viagens?.length || 0;
  const viagensConcluidas =
    motorista.viagens?.filter((v) => String(v.status) === "Concluida").length ||
    0;
  const totalComissoes =
    motorista.comissoes?.reduce((acc, c) => acc + (c.valorCalculado || 0), 0) ||
    0;
  const comissoesPagas =
    motorista.comissoes
      ?.filter((c) => c.pago)
      .reduce((acc, c) => acc + (c.valorCalculado || 0), 0) || 0;

  return (
    <FormModal
      open={open}
      onClose={onClose}
      title="Motorista"
      mode="view"
      icon={<Eye className="h-6 w-6 text-white" />}
    >
      <div className="space-y-6">
        {/* Informações Pessoais */}
        <div className="bg-blue-50 rounded-xl p-4">
          <div className="flex items-center gap-3 mb-2">
            <User className="h-5 w-5 text-blue-600" />
            <Typography variant="h6">Informações Pessoais</Typography>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <Typography>Nome: {motorista.nome}</Typography>
              <Typography>CPF: {formatarCPF(motorista.cpf)}</Typography>
              <Typography>CNH: {motorista.cnh}</Typography>
              <Typography>
                Data de Nascimento:{" "}
                {new Date(motorista.dataNascimento).toLocaleDateString("pt-BR")}
              </Typography>
            </div>
            <div className="space-y-1">
              <Typography>Telefone: {motorista.telefone}</Typography>
              <Typography>
                Status: {motorista.ativo ? "Ativo" : "Inativo"}
              </Typography>
            </div>
          </div>
        </div>

        {/* Estatísticas */}
        <div className="bg-indigo-50 rounded-xl p-4">
          <div className="flex items-center gap-3 mb-2">
            <Receipt className="h-5 w-5 text-indigo-600" />
            <Typography variant="h6">Estatísticas</Typography>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <Typography>Total de Viagens: {totalViagens}</Typography>
              <Typography>Viagens Concluídas: {viagensConcluidas}</Typography>
            </div>
            <div className="space-y-1">
              <Typography>
                Total em Comissões:{" "}
                {totalComissoes.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </Typography>
              <Typography>
                Comissões Pagas:{" "}
                {comissoesPagas.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </Typography>
            </div>
          </div>
        </div>

        {/* Histórico de Viagens */}
        <div className="bg-blue-gray-50 rounded-xl p-4">
          <div className="flex items-center gap-3 mb-2">
            <MapPin className="h-5 w-5 text-blue-gray-600" />
            <Typography variant="h6">Histórico de Viagens</Typography>
          </div>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {motorista.viagens
              ?.filter((viagem) => String(viagem.status) !== "Cancelada")
              .map((viagem) => (
                <div
                  key={viagem.id}
                  className="bg-white rounded-lg p-3 shadow-sm space-y-2"
                >
                  <div className="flex justify-between items-center">
                    <Typography className="font-medium">
                      {viagem.origem} → {viagem.destino}
                    </Typography>
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          String(viagem.status) === "Concluida"
                            ? "bg-green-500"
                            : String(viagem.status) === "Em Andamento"
                            ? "bg-blue-500"
                            : String(viagem.status) === "Planejada"
                            ? "bg-amber-500"
                            : "bg-red-500"
                        }`}
                      />
                      <Typography className="text-sm">
                        {viagem.status}
                      </Typography>
                    </div>
                  </div>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>
                      Data:{" "}
                      {new Date(viagem.dataSaida).toLocaleDateString("pt-BR")}
                    </span>
                    {viagem.comissao && (
                      <span className="text-green-600 font-medium">
                        Comissão:{" "}
                        {viagem.comissao.toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })}
                      </span>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </FormModal>
  );
}
