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
  comissao: Comissao; // Percentual de comissão sobre o valor do frete
};

export type ViagemCompletas = Viagem & {
  motorista: Motorista;
  caminhao: Caminhao;
  custos: CustoViagem[];
  comissao?: Comissao;
};
