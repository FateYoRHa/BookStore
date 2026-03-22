import { useMutation, useQuery } from "@tanstack/react-query";

import { getBooksAdminRequest, putBookAdminRequest } from "../api/admin_books";

export const useGetAdminBooks = () => {
  return useQuery({
    queryKey: ["books"],
    queryFn: () => getBooksAdminRequest(),
    staleTime: 1000 * 60 * 2,
    refetchOnWindowFocus: false,
  });
};

export const useUpdateAdminBooks = () => {
  return useMutation({
    mutationFn: putBookAdminRequest,
  });
};
