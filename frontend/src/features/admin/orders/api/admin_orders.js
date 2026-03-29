import api from "@/services/axios";

export const getAdminOrdersRequest = async () => {
  const res = await api.get("/admin/orders");
  return res.data;
};
export const getAdminOrderDetailRequest = async (orderCode) => {
  const res = await api.get(`/admin/order/detail/${orderCode}`);
  return res.data;
};
