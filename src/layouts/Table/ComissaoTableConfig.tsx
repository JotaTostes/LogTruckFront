import { Eye, Check } from "lucide-react";
import type { Column, ActionButton } from "../../components/ui/DataTable";
import type { ComissaoCompleta } from "../../types/Comissao";
import { formatarCPF } from "../../utils/formatadores";

export const comissoesColumns: Column<ComissaoCompleta>[] = [
  {
    key: "viagem.motorista.nome",
    label: "Motorista",
    width: "25%",
    render: (item) => item.viagem.motorista.nome,
  },
  {
    key: "viagem.motorista.cpf",
    label: "CPF",
    width: "20%",
    render: (item) => formatarCPF(item.viagem.motorista.cpf),
  },
  {
    key: "viagem.valorFrete",
    label: "Valor do Frete",
    width: "20%",
    render: (item) =>
      item.viagem.valorFrete.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      }),
  },
  {
    key: "valorTotal",
    label: "Valor a Pagar",
    width: "20%",
    render: (item) =>
      item.valorCalculado.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      }),
  },
  {
    key: "status",
    label: "Status",
    width: "15%",
    render: (item) => (
      <div className="flex items-center gap-2">
        <div
          className={`w-2 h-2 rounded-full ${
            item.pago ? "bg-green-500" : "bg-amber-500"
          }`}
        />
        <span>{item.pago ? "Pago" : "A Pagar"}</span>
      </div>
    ),
  },
];

export const createComissoesActions = (
  onView: (comissao: ComissaoCompleta) => void,
  onSetPaid: (id: string) => void
): ActionButton<ComissaoCompleta>[] => [
  {
    icon: <Eye color="gray" className="h-4 w-4" />,
    onClick: onView,
    title: "Visualizar Detalhes",
  },
  {
    icon: <Check className="h-4 w-4 text-green-500" />,
    onClick: (comissao) => comissao.id && onSetPaid(comissao.id),
    title: "Marcar como Paga",
    show: (comissao) => !comissao.pago,
  },
];
