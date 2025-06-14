import { create } from "zustand";
import api from "../utils/api";
import { toast } from "react-hot-toast";
import type { Usuario, UsuarioDto } from "../types/Usuario";

type RoleUsuario = "Administrador" | "Operador" | "Motorista";

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
