import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

interface Props {
  roles: string[];
}

export default function PrivateRoute({ roles }: Props) {
  const { isAuthenticated, usuario } = useAuthStore();
  console.log("Roles", roles);
  if (!isAuthenticated) return <Navigate to="/login" />;

  if (!roles.includes(usuario?.role ?? ""))
    return <Navigate to="/unauthorized" />;

  return <Outlet />;
}
