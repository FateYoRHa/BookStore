import { useQuery } from "@tanstack/react-query";
import { getBooksRequest } from "../api/books.js";

export const useBooks = () => {
  return useQuery({ queryKey: ["books"], queryFn: getBooksRequest });
};
