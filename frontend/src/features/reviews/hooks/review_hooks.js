import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "@/features/auth/store/authStore";
import { useNavigate } from "react-router-dom";

import { postReviewRequest, updateReviewRequest } from "../api/reviews";

/**
 * Hook to post a new review
 */
export const usePostReview = (bookId) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const customer = useAuthStore((state) => state.customer);

  return useMutation({
    mutationFn: (review) => postReviewRequest(review),
    onMutate: async (newReview) => {
      // Redirect to login if not logged in
      if (!customer) {
        navigate("/login", { state: { from: `/books/${bookId}` } });
        return;
      }

      await queryClient.cancelQueries(["reviews", bookId]);
      const previousReviews = queryClient.getQueryData(["reviews", bookId]);

      // Optimistic update
      queryClient.setQueryData(["reviews", bookId], (old = []) => [
        {
          ...newReview,
          _id: Date.now(), // temporary ID
          user: { name: customer?.name || "Guest" },
          optimistic: true,
        },
        ...old,
      ]);

      return { previousReviews };
    },

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
  const navigate = useNavigate();
  const customer = useAuthStore((state) => state.customer);

  return useMutation({
    mutationFn: (review) => updateReviewRequest(review),
    onMutate: async (updatedReview) => {
      if (!customer) {
        navigate("/login", { state: { from: `/books/${bookId}` } });
        return;
      }

      await queryClient.cancelQueries(["reviews", bookId]);
      const previousReviews = queryClient.getQueryData(["reviews", bookId]);

      // Optimistic update
      queryClient.setQueryData(["reviews", bookId], (old = []) =>
        old.map((r) =>
          r._id === updatedReview._id
            ? {
                ...r,
                ...updatedReview,
                user: { name: customer?.name || "Guest" },
                optimistic: true,
              }
            : r,
        ),
      );

      return { previousReviews };
    },

    onError: (err, updatedReview, context) => {
      queryClient.setQueryData(["reviews", bookId], context?.previousReviews);
    },

    onSettled: () => {
      queryClient.invalidateQueries(["reviews", bookId]);
    },
  });
};
