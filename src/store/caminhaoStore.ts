import { create } from "zustand";
import type { Caminhao, CaminhaoCompletos } from "../types/Caminhao";

interface CaminhaoStore {
  caminhoes: Caminhao[];
  caminhoesCompletos: CaminhaoCompletos[];
  setCaminhoes: (caminhoes: Caminhao[]) => void;
  setCaminhoesCompletos: (caminhoesCompletos: CaminhaoCompletos[]) => void;
}

export const useCaminhaoStore = create<CaminhaoStore>((set) => ({
  caminhoes: [],
  caminhoesCompletos: [],
  setCaminhoes: (caminhoes) => set({ caminhoes }),
  setCaminhoesCompletos: (caminhoesCompletos) => set({ caminhoesCompletos }),
}));
