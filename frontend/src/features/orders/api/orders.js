import api from "@/services/axios";

export const checkoutRequest = async (data) => {
  const response = await api.post("/commerce/checkout", data);
  return response.data;
};
