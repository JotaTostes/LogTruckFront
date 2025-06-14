import type { Caminhao } from "./Caminhao";
import type { Motorista } from "./Motorista";
import type { CustoViagem } from "./CustoViagem";
import type { Comissao } from "./Comissao";

export type Viagem = {
  id?: string;
  motoristaId: string;
  caminhaoId: string;
  origem: string;
  destino: string;
  quilometragem: number;
  dataSaida: string;
  dataRetorno?: string;
  status: number; // 1: Planejada, 2: EmAndamento, 3: Concluída, 4: Cancelada
  valorFrete: number;
  comissao: number; // Percentual de comissão sobre o valor do frete
};

export type ViagemCompletas = Viagem & {
  motorista: Motorista;
  caminhao: Caminhao;
  custos: CustoViagem[];
  comissao?: Comissao;
  motoristaNome: string;
  caminhaoPlaca: string;
  statusNome: string;
};

export type CreateViagemDto = {
  motoristaId: string;
  caminhaoId: string;
  origem: string;
  destino: string;
  quilometragem: number;
  valorFrete: number;
  comissao: number;
  dataSaida: string; // ISO date string
};

export type UpdateViagemDto = CreateViagemDto & {
  id: string;
};
