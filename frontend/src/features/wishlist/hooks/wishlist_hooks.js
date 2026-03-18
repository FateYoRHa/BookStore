import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { addWishlistRequest, getWishlistRequest } from "../api/wishlist";
import { useAuthStore } from "@/features/auth/store/authStore";

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

export const useGetWishlist = () => {
  // get user
  const user = useAuthStore((state) => state.user);
  return useQuery({
    queryKey: ["wishlist"],
    queryFn: () => getWishlistRequest(),
    enabled: !!user, // only runs when logged in
    staleTime: 1000 * 60 * 2,
    refetchOnWindowFocus: false,
  });
};
