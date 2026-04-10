import api from "@/services/axios";

export const getDashboardRevenueRequest = async () => {
  const response = await api.get("/admin/dashboard/revenue");
  return response.data;
};