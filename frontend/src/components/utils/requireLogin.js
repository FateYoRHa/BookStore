import { useAuthStore } from "@/features/auth/store/authStore";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const useRequireLogin = () => {
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();

  return () => {
    if (!user) {
      toast("You must login first.", { icon: "⚠️" });
      navigate("/login", { state: { from: window.location.pathname } });
      return false;
    }
    return true;
  };
};
