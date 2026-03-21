import api from "@/services/axios";

export const getAdminAuthors = async () => {
  const response = await api.get("/admin/authors");
  return response.data;
};

export const getAdminAuthorsList = async () => {
  const response = await api.get("/admin/authors/list");
  return response.data;
};
