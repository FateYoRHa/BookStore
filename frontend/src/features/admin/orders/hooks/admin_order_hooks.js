import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAdminOrderDetailRequest,
  getAdminOrdersRequest,
  updateAdminOrderRequest,
} from "../api/admin_orders";

export const useGetAdminOrders = () => {
  return useQuery({
    queryKey: ["orders"],
    queryFn: () => getAdminOrdersRequest(),
    staleTime: 1000 * 60 * 2,
    refetchOnWindowFocus: false,
  });
};
export const useGetAdminOrderDetail = (code) => {
  return useQuery({
    queryKey: ["orders", code],
    queryFn: () => getAdminOrderDetailRequest(code),
  });
};

export const useUpdateAdminOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (orderCode) => updateAdminOrderRequest(orderCode),
    onSuccess: () => {
      queryClient.invalidateQueries(["orders"]);
    },
  });
};
