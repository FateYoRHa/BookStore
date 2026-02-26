import { getCustomerRequest } from "../api/customer";
import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/features/auth/store/authStore";
export const useGetCustomer = () => {
  // get user
  const user = useAuthStore((state) => state.user);
  return useQuery({
    queryKey: ["customers"],
    queryFn: () => getCustomerRequest(),
    enabled: !!user, // only runs when logged in
    staleTime: 1000 * 60 * 2,
    refetchOnWindowFocus: false,
  });
};