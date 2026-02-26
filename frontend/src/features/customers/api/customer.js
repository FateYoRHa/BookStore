import api from "@/services/axios";

export const getCustomerRequest = async () => {
  const response = await api.get("/core/customers/me");
  return response.data;
};
