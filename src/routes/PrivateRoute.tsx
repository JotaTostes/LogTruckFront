import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

interface Props {
  roles: string[];
}

export default function PrivateRoute({ roles }: Props) {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) return <Navigate to="/login" />;

  if (!roles.includes(user?.role ?? "")) return <Navigate to="/unauthorized" />;

  return <Outlet />;
}
