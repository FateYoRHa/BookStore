import api from "@/services/axios";

export const getAdminAuthors = async () => {
  const response = await api.get("/admin/authors");
  return response.data;
};

export const getAdminAuthorsList = async () => {
  const response = await api.get("/admin/authors/list");
  return response.data;
};
export const addAdminAuthor = async (author) => {
  const response = await api.post("/admin/authors", author);
  return response.data;
};

export const updateAdminAuthor = async (author) => {
  const response = await api.put(`/admin/authors/${author.authorCode}`, author);
  return response.data;
};
export const deleteAdminAuthor = async (author) => {
  const response = await api.delete(`/admin/authors/${author}`);
  return response.data;
};
export const reAddAdminAuthor = async (author) => {
  const response = await api.patch(`/admin/authors/${author}/restore`);
  return response.data;
};
