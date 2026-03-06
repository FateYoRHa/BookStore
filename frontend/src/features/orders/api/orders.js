import api from "@/services/axios";

export const checkoutRequest = async (data) => {
  const response = await api.post("/commerce/payment", data);
  return response.data;
};
