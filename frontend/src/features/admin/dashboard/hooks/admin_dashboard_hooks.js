import { useQuery } from "@tanstack/react-query";
import {
  getDashboardCustomerSummaryRequest,
  getDashboardRevenueRequest,
  getDashboardPerformanceSummaryRequest,
} from "../api/admin_dashboard_api";

export const useGetDashboardRevenue = () => {
  return useQuery({
    queryKey: ["dashboardRevenue"],
    queryFn: () => getDashboardRevenueRequest(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useGetDashboardCustomerSummary = () => {
  return useQuery({
    queryKey: ["dashboardCustomers"],
    queryFn: () => getDashboardCustomerSummaryRequest(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useGetDashboardPerformanceSummary = () => {
  return useQuery({
    queryKey: ["dashboardPerformance"],
    queryFn: () => getDashboardPerformanceSummaryRequest(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};