import type { Viagem } from "./Viagem";

export interface CustoViagemPayload {
  viagemId: string;
  tipo: number;
  valor: number;
  descricao: string;
}

export interface CustoViagem extends CustoViagemPayload {
  id: string;
}

export interface CustoViagemCompletoDto extends CustoViagem {
  viagem: Viagem;
}

export const tiposCustoOptions = [
  { value: 1, label: "Combustível" },
  { value: 2, label: "Pernoite" },
  { value: 3, label: "Pedágio" },
  { value: 4, label: "Manutenção" },
  { value: 99, label: "Outros" },
];
