import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  getBooksAdminRequest,
  putBookAdminRequest,
  addBookAdminRequest,
  removeBookAdminRequest,
} from "../api/admin_books";

export const useGetAdminBooks = () => {
  return useQuery({
    queryKey: ["books"],
    queryFn: () => getBooksAdminRequest(),
    staleTime: 1000 * 60 * 2,
    refetchOnWindowFocus: false,
  });
};

export const useUpdateAdminBooks = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: putBookAdminRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
    },
  });
};
export const useAddAdminBook = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addBookAdminRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
    },
  });
};

export const useRemoveAdminBook = (book) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: removeBookAdminRequest(book),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
    },
  });
};
