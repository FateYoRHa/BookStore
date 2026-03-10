import api from "@/services/axios";

export const checkoutRequest = async (data) => {
  const response = await api.post("/commerce/payment", data);
  return response.data;
};

export const getCustomerOrdersRequest = async () => {
  const response = await api.get("/customer/orders")
  return response.data
}