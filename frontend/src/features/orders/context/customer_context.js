import { createContext } from "react";

export const ShippingContext = createContext({
  id: null,
  fee: 0,
  name: "",
});
