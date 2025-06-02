import type { Caminhao } from "./Caminhao";
import type { Motorista } from "./Motorista";
// import { CustoViagem } from './CustoViagem';

export type Viagem = {
  id?: string;
  motoristaId: string;
  caminhaoId: string;
  origem: string;
  destino: string;
  quilometragem: number;
  dataSaida: string;
  dataRetorno?: Date;
  status?: number; // 1: Planejada, 2: EmAndamento, 3: Concluída, 4: Cancelada
  valorFrete: number;
};

export type ViagemCompletas = Viagem & {
  motorista: Motorista;
  caminhao: Caminhao;
  // custos: CustoViagem[];
  // comissao?: Comissao;
};
