import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import PrivateRoute from "../routes/PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" />} />
      <Route path="/login" element={<Login />} />
      <Route element={<PrivateRoute roles={["Administrador", "Operador"]} />}>
        <Route
          path="/dashboard"
          element={
            <DashboardLayout>
              <Dashboard />
            </DashboardLayout>
          }
        />
        {/* <Route
          path="/usuarios"
          element={
            <DashboardLayout>
              <Usuarios />
            </DashboardLayout>
          }
        /> */}
      </Route>
    </Routes>
  );
}
