import { type Motorista } from "./Motorista";
export type Usuario = {
  id: string;
  nome: string;
  email: string;
  cpf: string;
  senhaHash?: string;
  role: number;
  ativo: boolean;
};

export type UsuarioDto = {
  id: string;
  nome: string;
  email: string;
  cpf: string;
  senhaHash?: string;
  role: number;
  ativo: boolean;
  motorista?: Motorista | null;
};
