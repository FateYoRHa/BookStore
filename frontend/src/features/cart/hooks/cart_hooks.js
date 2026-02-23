import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { getCartRequest, addToCartRequest } from "../api/cart.js";
import { useAuthStore } from "@/features/auth/store/authStore";

export const useCart = () => {
  // get user
  const user = useAuthStore((state) => state.user);
  return useQuery({
    queryKey: ["carts"],
    queryFn: () => getCartRequest(user),
    enabled: !!user, // only runs when logged in
  });
};
export const useAddCart = () => {
  const user = useAuthStore((state) => state.user);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (items) => addToCartRequest(user, items),
    onSuccess: () => {
      // Refetch cart after adding item
      queryClient.invalidateQueries(["carts"]);
    },
  });
};
