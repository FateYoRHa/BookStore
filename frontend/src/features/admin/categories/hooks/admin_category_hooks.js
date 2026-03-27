import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAdminCategoriesRequest } from "../api/admin_categories";

export const useAdminGetCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => getAdminCategoriesRequest(),
    staleTime: 1000 * 60 * 2,
    refetchOnWindowFocus: false,
  });
}