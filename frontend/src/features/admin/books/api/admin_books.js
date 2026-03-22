import api from "@/services/axios";

export const getBooksAdminRequest = async () => {
  const response = await api.get("/admin/books");
  return response.data;
};

export const putBookAdminRequest = async (book) => {
  const response = await api.put(`/admin/books/${book.bookCode}`, book);
  return response.data;
};
