import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addAdminAuthor,
  getAdminAuthors,
  getAdminAuthorsList,
  updateAdminAuthor,
} from "../api/admin_authors";

export const useGetAdminAuthorsList = () => {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: ["authors"],
    queryFn: () => getAdminAuthorsList(),
    onSuccess: (data) => {
      queryClient.setQueryData(["authors"], data);
    },
  });
};

export const useGetAdminAuthors = () => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["authors"],
    queryFn: () => getAdminAuthors(),
    onSuccess: (data) => {
      queryClient.setQueryData(["authors"], data);
    },
  });
};

export const useAddAdminAuthor = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (author) => addAdminAuthor(author),
    onSuccess: () => {
      queryClient.invalidateQueries(["authors"]);
    },
  });
};

export const useUpdateAdminAuthor = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (author) => updateAdminAuthor(author),
    onSuccess: () => {
      queryClient.invalidateQueries(["authors"]);
    },
  });
};
