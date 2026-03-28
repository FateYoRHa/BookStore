import api from "@/services/axios";

export const getAdminOrdersRequest = async () => {
  const res = await api.get("/admin/orders");
  return res.data;
};
