import { type Motorista } from "./Motorista";
export type Usuario = {
  id: string;
  nome: string;
  email: string;
  cpf: string;
  senha?: string;
  role: number;
  ativo: boolean;
};

export type UsuarioDto = {
  id: string;
  nome: string;
  email: string;
  cpf: string;
  senhah?: string;
  role: number;
  ativo: boolean;
  motorista?: Motorista | null;
};
