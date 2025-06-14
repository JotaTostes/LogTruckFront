import { type Motorista } from "./Motorista";
export type Usuario = {
  id: string;
  nome: string;
  email: string;
  cpf: string;
  senha?: string;
  role: string;
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

export type UpdateUsuarioDto = CreateUsuarioDto & {
  id: string;
};

export type CreateUsuarioDto = {
  nome: string;
  email: string;
  senha: string;
  cpf: string;
  role: number;
};
