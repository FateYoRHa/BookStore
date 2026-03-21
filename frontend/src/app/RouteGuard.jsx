import { Navigate } from "react-router-dom";
import { useAuthStore } from "@/features/auth/store/authStore";
import { toast } from "sonner";
export default function RouteGuard({ children }) {
  const user = useAuthStore((state) => state.user);
  // not logged in
  // TODO toggle modal/dialog instead of navigating
  if (!user) {
    return <Navigate to="/login" replace />;
  } 
  // not admin
  if (user.role !== "admin") {
    toast.warning("Unauthorized");
    return <Navigate to="/" replace />;
  }

  return children;
}