import api from "@/services/axios";

export const getBooksAdminRequest = async () => {
  const response = await api.get("/admin/books");
  return response.data;
};

export const putBookAdminRequest = async (book) => {
  const response = await api.put(`/admin/books/${book.bookCode}`, book);
  return response.data;
};
export const addBookAdminRequest = async (book) => {
  const response = await api.post("/admin/books", book);
  return response.data;
};
export const removeBookAdminRequest = async (book) => {
  const response = await api.delete(`/admin/books/${book}`);
  return response.data;
};
export const reAddBookAdminRequest = async (book) => {
  const response = await api.post(`/admin/books/readd/${book}`);
  return response.data;
};
