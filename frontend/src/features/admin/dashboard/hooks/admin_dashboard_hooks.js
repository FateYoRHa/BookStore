import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getDashboardRevenueRequest } from "../api/admin_dashboard_api";

export const useGetDashboardRevenue = () => {
  return useQuery({
    queryKey: ["dashboardRevenue"],
    queryFn: () => getDashboardRevenueRequest(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
