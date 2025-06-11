import AprovarViagens from "../pages/Viagens/Aprovar/AprovarViagens";
import Caminhao from "../pages/Caminhao/Caminhao";
import Comissao from "../pages/Comissao/Comissao";
import Dashboard from "../pages/Dashboard/Dashboard";
import DefaultLayout from "../layouts/DefaultLayout";
import Login from "../pages/Login";
import Motoristas from "../pages/Motoristas/Motoristas";
import PrivateRoute from "../routes/PrivateRoute";
import Usuarios from "../pages/Usuario/Usuarios";
import Viagens from "../pages/Viagens/Viagens";
import { Routes, Route, Navigate } from "react-router-dom";
export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" />} />
      <Route path="/login" element={<Login />} />

      <Route element={<PrivateRoute roles={["Administrador", "Operador"]} />}>
        <Route element={<DefaultLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/usuarios" element={<Usuarios />} />
          <Route path="/motoristas" element={<Motoristas />} />
          <Route path="/viagens" element={<Viagens />} />
          <Route path="/caminhoes" element={<Caminhao />} />
          <Route path="/custos/comissoes" element={<Comissao />} />
          <Route path="/viagens/aprovar" element={<AprovarViagens />} />
        </Route>
      </Route>
    </Routes>
  );
}
