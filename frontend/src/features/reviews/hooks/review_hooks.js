import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "@/features/auth/store/authStore";

import { postReviewRequest } from "../api/reviews";

export const usePostReview = (bookId) => {
  const queryClient = useQueryClient();
  const customer = useAuthStore((state) => state.customer).customer;
  return useMutation({
    mutationFn: (review) => postReviewRequest(review),
    onMutate: async (newReview) => {
      await queryClient.cancelQueries(["reviews", bookId]);

      const previousReviews = queryClient.getQueryData(["reviews", bookId]);

      queryClient.setQueryData(["reviews", bookId], (old = []) => [
        {
          ...newReview,
          _id: Date.now(),
          user: { name: customer.name },
          optimistic: true,
        },
        ...old,
      ]);

      return { previousReviews };
    },

    onError: (err, newReview, context) => {
      queryClient.setQueryData(["reviews", bookId], context.previousReviews);
    },

    onSettled: () => {
      queryClient.invalidateQueries(["reviews", bookId]);
    },
  });
};
