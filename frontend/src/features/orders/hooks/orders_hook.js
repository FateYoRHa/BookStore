import { checkoutRequest, getCustomerOrdersRequest } from "../api/orders";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/features/auth/store/authStore";

export const useCheckout = () => {
  return useMutation({
    mutationFn: checkoutRequest,
  });
};

export const useGetCustomerOrders = () => {
  const user = useAuthStore((state) => state.user);
  return useQuery({
    queryKey: ["orders"],
    queryFn: () => getCustomerOrdersRequest(),
    enabled: !!user, // only runs when logged in
    staleTime: 1000 * 60 * 2,
    refetchOnWindowFocus: false,
  });
};
