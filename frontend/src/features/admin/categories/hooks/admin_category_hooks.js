import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addCategoryRequest,
  getAdminCategoriesRequest,
  reAddCategoryRequest,
  removeCategoryRequest,
  updateCategoryRequest,
} from "../api/admin_categories";

export const useAdminGetCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => getAdminCategoriesRequest(),
    staleTime: 1000 * 60 * 2,
    refetchOnWindowFocus: false,
  });
};

export const useAddAdminCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (category) => addCategoryRequest(category),
    onSuccess: () => {
      queryClient.invalidateQueries(["categories"]);
    },
  });
};
export const useUpdateAdminCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (category) => updateCategoryRequest(category),
    onSuccess: () => {
      queryClient.invalidateQueries(["categories"]);
    },
  });
};
export const useRemoveAdminCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (category) => removeCategoryRequest(category),
    onSuccess: () => {
      queryClient.invalidateQueries(["categories"]);
    },
  });
};
export const useReAddAdminCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (category) => reAddCategoryRequest(category),
    onSuccess: () => {
      queryClient.invalidateQueries(["categories"]);
    },
  });
};
