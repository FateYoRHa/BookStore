import { useMutation } from "@tanstack/react-query";
import { loginRequest, signupRequest, logoutRequest } from "../api/auth.js";
import { useAuthStore } from "../store/authStore.js";
import { toast } from "sonner";

export const useLogin = () => {
  // const setUser = useAuthStore((state) => state.setUser);
  const login = useAuthStore((state) => state.login);
  return useMutation({
    // This is the function that performs the request
    mutationFn: loginRequest,

    // Runs when request succeeds
    onSuccess: (data) => {
      // Save user globally
      login(data);
      // login(data.user, data.token);
      toast.success("Login successful");
      const user = useAuthStore.getState().user;
      const customer = useAuthStore.getState().customer;
      if (user.role === "admin") {
        window.location.href = "/admin/dashboard";
        toast.success(`Welcome back!`);
      } else {
        toast.success(`Welcome ${customer.name}!`);
      }
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
export const useSignup = () => {
  const login = useAuthStore((state) => state.login);

  return useMutation({
    mutationFn: signupRequest,

    onSuccess: (data) => {
      login(data);
      toast.success("Account created successfully");
    },
  });
};
export const useLogout = () => {
  const logout = useAuthStore((state) => state.logout);
  return useMutation({
    mutationFn: logoutRequest,

    onSuccess: () => {
      logout();
      toast.success("Logged out");
    },
    onError: (error) => {
      if (error.response) {
        // Server responded with error
        toast.error(error.response.data?.message || "Logout failed");
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
