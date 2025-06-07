export type Comissao = {
  id: string;
  viagemId: string;
  percentual: number;
  valorCalculado: number;
  pago: boolean;
  dataPagamento?: Date;
};

export type ComissaoCompleta = {
  id: string;
  percentual: number;
  valorCalculado: number;
  pago: boolean;
  viagem: {
    id: string;
    motorista: {
      id: string;
      usuarioId: string;
      nome: string;
      cpf: string;
      cnh: string;
      dataNascimento: string;
      telefone: string;
      ativo: boolean;
      criadoEm: string;
      atualizadoEm: string;
      usuario: any | null;
    };
    caminhao: any | null;
    origem: string;
    destino: string;
    quilometragem: number;
    valorFrete: number;
    dataSaida: string;
    dataRetorno: string;
    status: number;
    custos: any | null;
    comissao: any | null;
  };
};
