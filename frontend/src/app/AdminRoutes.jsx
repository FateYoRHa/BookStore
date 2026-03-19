import { Navigate } from "react-router-dom";
import { useAuthStore } from "@/features/auth/store/authStore";

export default function AdminRoutes({ children }) {
  const user = useAuthStore((state) => state.user);
  if (!user) return <Navigate to="/login" replace />; // not logged in
  if (user.role !== "admin") return <Navigate to="/" replace />; // not admin

  return children;
}
