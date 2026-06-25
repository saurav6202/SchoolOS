import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

type Props = {
  allowedRole: string;
  children: React.ReactNode;
};

const ProtectedRoute = ({ allowedRole, children }: Props) => {
  const role = useAuthStore((state) => state.role);
  const user = useAuthStore((s) => s.user);

  const location = useLocation();

  if (!role) {
    return <Navigate to="/login" replace />;
  }

  if (role !== allowedRole) {
    return <Navigate to="/login" replace />;
  }

  if (user?.mustChangePassword && location.pathname !== "/change-password") {
    return <Navigate to="/change-password" replace />;
  }

  return children;
};

export default ProtectedRoute;
