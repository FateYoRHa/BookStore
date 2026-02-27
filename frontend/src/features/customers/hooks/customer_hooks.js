import {
  getCustomerRequest,
  updateCustomerRequest,
  updateProfileRequest,
} from "../api/customer";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/features/auth/store/authStore";
import toast from "react-hot-toast";

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

export const useUpdateCustomer = () => {
  const customer = useAuthStore((state) => state.setCustomer);
  return useMutation({
    mutationFn: updateCustomerRequest,

    onSuccess: () => {
      customer();
      toast.success("Profile updated successfully");
    },
  });
};

export const useUploadPicture = () => {
  const customer = useAuthStore((state) => state.setCustomer);
  return useMutation({
    mutationFn: updateProfileRequest,
    onSuccess: () => {
      customer();
      toast.success("Profile picture uploaded successfully");
    },
    onError: (errors) => {
      toast.error(errors.message || "Invalid image.");
    },
  });
};