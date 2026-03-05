import { checkoutRequest } from "../api/orders";
import { useMutation } from "@tanstack/react-query";

export const useCheckout = () => {
  return useMutation({
    mutationFn: checkoutRequest,
  });
};
