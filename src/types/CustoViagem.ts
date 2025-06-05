export interface CustoViagemPayload {
  // Para criação
  viagemId: string;
  tipo: number;
  valor: number;
  descricao: string;
}

export interface CustoViagem extends CustoViagemPayload {
  // Para exibição, se vier com ID
  id: string;
}

export const tiposCustoOptions = [
  { value: 1, label: "Combustível" },
  { value: 2, label: "Pernoite" },
  { value: 3, label: "Pedágio" },
  { value: 4, label: "Manutenção" },
  { value: 99, label: "Outros" },
];
