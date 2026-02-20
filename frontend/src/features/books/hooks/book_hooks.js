import { useQuery } from "@tanstack/react-query";
import { getBooksRequest, getBookRequest } from "../api/books.js";

export const useBooks = (filters) => {
  return useQuery({
    queryKey: ["books", filters],
    queryFn: () => getBooksRequest(filters),
  });
};

export const useBook = (id) => {
  return useQuery({
    queryKey: [ "books", id ],
    queryFn: () => getBookRequest(id)
  })
}