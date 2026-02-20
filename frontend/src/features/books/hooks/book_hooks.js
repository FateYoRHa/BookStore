import { useQuery } from "@tanstack/react-query";
import { getBooksRequest } from "../api/books.js";

export const useBooks = (filters) => {
  return useQuery({
    queryKey: ["books", filters],
    queryFn: () => getBooksRequest(filters),
  });
};
