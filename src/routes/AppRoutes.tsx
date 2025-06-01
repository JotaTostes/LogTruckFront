import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard/Dashboard";
import Usuarios from "../pages/Usuario/Usuarios";
import Motoristas from "../pages/Motoristas/Motoristas";
import PrivateRoute from "../routes/PrivateRoute";
import DefaultLayout from "../layouts/DefaultLayout";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" />} />
      <Route path="/login" element={<Login />} />

      {/* Rotas privadas com layout */}
      <Route element={<PrivateRoute roles={["Administrador", "Operador"]} />}>
        <Route element={<DefaultLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/usuarios" element={<Usuarios />} />
          <Route path="/motoristas" element={<Motoristas />} />
        </Route>
      </Route>
    </Routes>
  );
}
