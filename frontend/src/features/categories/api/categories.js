import api from "@/services/axios";

export const getCategoriesRequest = async () => {
  const response = await api.get("/core/categories");
  return response.data;
};
