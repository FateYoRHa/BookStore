import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
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

  return useMutation({
    mutationFn: (items) => addToCartRequest(items),
    onSuccess: () => {
      queryClient.invalidateQueries(["carts"]);
      toast.success("Cart updated.");
    },
  });
};

export const useRemoveCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (item) => removeFromCartRequest(item),
    onSuccess: () => {
      queryClient.invalidateQueries(["carts"]);
      toast.success("Item removed from cart.");
    },
  });
};

export const useClearCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => clearCartRequest(),
    onSuccess: () => {
      queryClient.invalidateQueries(["carts"]);
      toast.success("Cart cleared.");
    },
  });
};
