import { useMutation, useQueryClient } from "@tanstack/react-query";

import { postReviewRequest, updateReviewRequest } from "../api/reviews";

/**
 * Hook to post a new review
 */
export const usePostReview = (bookId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (review) => postReviewRequest(review),

    onError: (err, newReview, context) => {
      // rollback on error
      queryClient.setQueryData(["reviews", bookId], context?.previousReviews);
    },

    onSettled: () => {
      queryClient.invalidateQueries(["reviews", bookId]);
    },
  });
};

/**
 * Hook to update an existing review
 */
export const usePutReview = (bookId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (review) => updateReviewRequest(review),

    onError: (err, updatedReview, context) => {
      queryClient.setQueryData(["reviews", bookId], context?.previousReviews);
    },

    onSettled: () => {
      queryClient.invalidateQueries(["reviews", bookId]);
    },
  });
};
