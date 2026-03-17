import { useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { addWishlistRequest } from "../api/wishlist";
export const useAddWishlist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (book) => addWishlistRequest(book),
    onSuccess: () => {
      // Refetch cart after adding item
      queryClient.invalidateQueries(["wishlist"]);
      toast.success("Book added to wishlist.");
    },
  });
};
