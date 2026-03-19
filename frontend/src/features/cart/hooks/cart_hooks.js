import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { useAuthStore } from "@/features/auth/store/authStore";
import {
  getCartRequest,
  addToCartRequest,
  removeFromCartRequest,
  clearCartRequest,
} from "../api/cart.js";

export const useCart = () => {
  const user = useAuthStore((state) => state.user);

  return useQuery({
    queryKey: ["carts"],
    queryFn: () => getCartRequest(),
    enabled: !!user, // only fetch if logged in
    staleTime: 1000 * 60 * 2,
    refetchOnWindowFocus: false,
  });
};

export const useAddCart = () => {
  const queryClient = useQueryClient();
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (items) => addToCartRequest(items),
    onMutate: () => {
      if (!user) {
        toast("You must login to add items to cart.", { icon: "⚠️" });
        navigate("/login", { state: { from: window.location.pathname } });
        // Cancel mutation
        return Promise.reject("Not logged in");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["carts"]);
      toast.success("Cart updated.");
    },
  });
};

export const useRemoveCart = () => {
  const queryClient = useQueryClient();
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (item) => removeFromCartRequest(item),
    onMutate: () => {
      if (!user) {
        toast("You must login first.", { icon: "⚠️" });
        navigate("/login", { state: { from: window.location.pathname } });
        return Promise.reject("Not logged in");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["carts"]);
      toast.success("Item removed from cart.");
    },
  });
};

export const useClearCart = () => {
  const queryClient = useQueryClient();
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: () => clearCartRequest(),
    onMutate: () => {
      if (!user) {
        toast("You must login first.", { icon: "⚠️" });
        navigate("/login", { state: { from: window.location.pathname } });
        return Promise.reject("Not logged in");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["carts"]);
      toast.success("Cart cleared.");
    },
  });
};
