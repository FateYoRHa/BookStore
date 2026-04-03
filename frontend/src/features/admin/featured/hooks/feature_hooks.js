import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { featureItemRequest } from "../api/feature_api";

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
