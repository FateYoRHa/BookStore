import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAdminOrdersRequest } from "../api/admin_orders";

export const useGetAdminOrders = () => {
  return useQuery({
    queryKey: ["orders"],
    queryFn: () => getAdminOrdersRequest(),
    staleTime: 1000 * 60 * 2,
    refetchOnWindowFocus: false,
  });
};
