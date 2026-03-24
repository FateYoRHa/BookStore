import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAdminAuthors, getAdminAuthorsList } from "../api/admin_authors";

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
