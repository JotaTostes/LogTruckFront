import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard/Dashboard";
import Usuarios from "../pages/Usuario/Usuarios";
import Motoristas from "../pages/Motoristas/Motoristas";
import Viagens from "../pages/Viagens/Viagens";
import Caminhao from "../pages/Caminhao/Caminhao";
import PrivateRoute from "../routes/PrivateRoute";
import DefaultLayout from "../layouts/DefaultLayout";
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
        </Route>
      </Route>
    </Routes>
  );
}
