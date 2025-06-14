import type { Comissao } from "./Comissao";
import type { Viagem } from "./Viagem";

export type Motorista = {
  id?: string;
  usuarioId: string;
  nome: string;
  cpf: string;
  cnh: string;
  telefone: string;
  ativo: boolean;
  dataNascimento: string;
};

export type MotoristaCompleto = Motorista & {
  viagens?: Viagem[];
  comissoes?: Comissao[];
};
