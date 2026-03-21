import { useQuery } from "@tanstack/react-query";
import { getAdminAuthorsList } from "../api/admin_authors";

export const useGetAdminAuthorsList = () => {
  return useQuery({
    queryKey: ["authors"],
    queryFn: () => getAdminAuthorsList(),
  });
};
