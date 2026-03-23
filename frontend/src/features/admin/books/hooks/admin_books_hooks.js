import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  getBooksAdminRequest,
  putBookAdminRequest,
  addBookAdminRequest,
  removeBookAdminRequest,
  reAddBookAdminRequest,
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

export const useRemoveAdminBook = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: removeBookAdminRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
    },
  });
};
export const useReAddAdminBook = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: reAddBookAdminRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
    },
  });
};
