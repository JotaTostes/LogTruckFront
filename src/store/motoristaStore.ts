import { create } from "zustand";
import type { Motorista, MotoristaCompleto } from "../types/Motorista";

interface MotoristaStore {
  motoristas: Motorista[];
  motoristasCompletos: MotoristaCompleto[];
  setMotoristas: (motoristas: Motorista[]) => void;
  setMotoristasCompletos: (motoristasCompletos: MotoristaCompleto[]) => void;
}

export const useMotoristaStore = create<MotoristaStore>((set) => ({
  motoristas: [],
  motoristasCompletos: [],
  setMotoristas: (motoristas) => set({ motoristas }),
  setMotoristasCompletos: (motoristasCompletos) => set({ motoristasCompletos }),
}));
