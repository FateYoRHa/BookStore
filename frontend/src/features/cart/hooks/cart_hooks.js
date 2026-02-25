import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import {
  getCartRequest,
  addToCartRequest,
  removeFromCartRequest,
  checkoutRequest,
} from "../api/cart.js";
import { useAuthStore } from "@/features/auth/store/authStore";

import toast from "react-hot-toast";

export const useCart = () => {
  // get user
  const user = useAuthStore((state) => state.user);
  return useQuery({
    queryKey: ["carts"],
    queryFn: () => getCartRequest(),
    enabled: !!user, // only runs when logged in
    staleTime: 1000 * 60 * 2,
    refetchOnWindowFocus: false,
  });
};
export const useAddCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (items) => addToCartRequest(items),
    onSuccess: () => {
      // Refetch cart after adding item
      queryClient.invalidateQueries([ "carts" ]);
      toast.success("Cart updated.")
    },
  });
};

export const useRemoveCart = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (item) => removeFromCartRequest(item),
    onSuccess: () => {
      // Refetch cart after adding item
      queryClient.invalidateQueries([ "carts" ]);
      
      toast.success("Item removed from cart.");
    },
  });
};
