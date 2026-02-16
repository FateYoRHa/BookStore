import { useMutation } from "@tanstack/react-query";
import { loginRequest } from "../api/login.js";
import { useAuthStore } from "../store/authStore.js";
import toast from "react-hot-toast";

export const useLogin = () => {
  const setUser = useAuthStore((state) => state.setUser);

  return useMutation({
    // This is the function that performs the request
    mutationFn: loginRequest,

    // Runs when request succeeds
    onSuccess: (data) => {
      setUser(data.user); // Save user globally
      toast.success("Login successful");
    },

    // Runs when request fails
    onError: (error) => {
      if (error.response) {
        // Server responded with error
        toast.error(error.response.data?.message || "Request failed");
      } else if (error.request) {
        // Request made but no response
        toast.error("Server not responding");
      } else {
        // Something else
        toast.error("Unexpected error occurred");
      }
    },
  });
};
