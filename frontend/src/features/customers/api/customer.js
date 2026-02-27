import api from "@/services/axios";

export const getCustomerRequest = async () => {
  const response = await api.get("/core/customers/me");
  return response.data;
};

export const updateCustomerRequest = async (data) => {
  const response = await api.put("/core/customers", data);
  return response.data;
};

export const updateProfileRequest = async (data) => {
  const response = await api.patch("/core/customers/profile/image", data);
  return response.data;
};
