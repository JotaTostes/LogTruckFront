export type Usuario = {
  id: string;
  nome: string;
  email: string;
  cpf: string;
  senhaHash?: string;
  role: "Administrador" | "Operador" | "Motorista";
  ativo: boolean;
};
