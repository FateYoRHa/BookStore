import { Navigate } from "react-router-dom";
import { useAuthStore } from "@/features/auth/store/authStore";
import { toast } from "sonner";

export default function RouteGuard({ children, allowedRoles = ["admin"] }) {
  const user = useAuthStore((state) => state.user);

  // Not logged in.
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Block users whose role is not allowed for this route.
  if (!allowedRoles.includes(user.role)) {
    toast.warning("Unauthorized");
    return <Navigate to="/" replace />;
  }

  return children;
}
