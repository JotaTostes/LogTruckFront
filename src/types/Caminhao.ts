import type { Viagem } from "./Viagem";

export type Caminhao = {
  id: string;
  placa: string;
  modelo: string;
  marca: string;
  ano: number;
  capacidadeToneladas: number;
  ativo: boolean;
};

export type CaminhaoCompletos = Caminhao & {
  viagens: Viagem[];
};

export type CreateCaminhaoDto = {
  placa: string;
  modelo: string;
  marca: string;
  ano: number;
  capacidadeToneladas: number;
};

export type UpdateCaminhaoDto = CreateCaminhaoDto & {
  id: string;
};
