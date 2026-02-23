import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { getCartRequest, addToCartRequest } from "../api/cart.js";
import { useAuthStore } from "@/features/auth/store/authStore";

export const useCart = () => {
  // get user
  const user = useAuthStore((state) => state.user);
  return useQuery({
    queryKey: ["carts"],
    queryFn: () => getCartRequest(),
    enabled: !!user, // only runs when logged in
  });
};
export const useAddCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (items) => addToCartRequest(items),
    onSuccess: () => {
      // Refetch cart after adding item
      queryClient.invalidateQueries(["carts"]);
    },
  });
};
