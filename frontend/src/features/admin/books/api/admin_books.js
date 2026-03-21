import api from "@/services/axios";

export const getBooksAdminRequest = async () => {
  const response = await api.get("/admin/books");
  return response.data;
};
