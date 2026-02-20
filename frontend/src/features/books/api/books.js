import api from "../../../services/axios.js";

export const getBooksRequest = async (filters) => {

  const response = await api.get("/core/books", {
    params: filters, // ✅ THIS IS REQUIRED
  });
  return response.data;
};

export const getBookRequest = async (data) => {
  const book = await api.get("/core/books",data);
  return book;
};