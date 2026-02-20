import api from "../../../services/axios.js";

export const getBooksRequest = async () => {
  const response = await api.get("/core/books");
  return response.data;
};

export const getBookRequest = async (data) => {
  const book = await api.get("/core/books",data);
  return book;
};