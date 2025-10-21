import { create } from "zustand";
import type { Usuario, UsuarioDto } from "../types/Usuario";

interface UsuarioStore {
  usuarios: Usuario[];
  usuariosMotoristas: UsuarioDto[];
  setUsuarios: (usuarios: Usuario[]) => void;
  setUsuariosMotoristas: (usuariosMotoristas: UsuarioDto[]) => void;
}

export const useUsuarioStore = create<UsuarioStore>((set) => ({
  usuarios: [],
  usuariosMotoristas: [],
  setUsuarios: (usuarios) => set({ usuarios }),
  setUsuariosMotoristas: (usuariosMotoristas) => set({ usuariosMotoristas }),
}));
