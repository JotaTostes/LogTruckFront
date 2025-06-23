import { create } from "zustand";
import type { Motorista, MotoristaCompleto } from "../types/Motorista";

interface MotoristaStore {
  motoristas: Motorista[];
  motoristasCompletos: MotoristaCompleto[];
  motoristasDeletados: Motorista[];
  setMotoristas: (motoristas: Motorista[]) => void;
  setMotoristasCompletos: (motoristasCompletos: MotoristaCompleto[]) => void;
  setMotoristasDeletados: (motoristasDeletados: Motorista[]) => void;
}

export const useMotoristaStore = create<MotoristaStore>((set) => ({
  motoristas: [],
  motoristasCompletos: [],
  motoristasDeletados: [],
  setMotoristas: (motoristas) => set({ motoristas }),
  setMotoristasCompletos: (motoristasCompletos) => set({ motoristasCompletos }),
  setMotoristasDeletados: (motoristasDeletados) => set({ motoristasDeletados }),
}));
