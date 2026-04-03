import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import {
  featureItemRequest,
  getFeaturedItemsRequest,
} from "../api/feature_api";

// GET FEATURED ITEMS
export const useGetFeaturedItems = () => {
  return useQuery({
    queryKey: ["featured"],
    queryFn: () => getFeaturedItemsRequest(),
    staleTime: 1000 * 60 * 2,
    refetchOnWindowFocus: false,
  });
};

// ADD FEATURED ITEM MUTATION
export const useFeatureItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (item) => featureItemRequest(item),
    onSuccess: () => {
      queryClient.invalidateQueries(["features"]);
    },
  });
};
