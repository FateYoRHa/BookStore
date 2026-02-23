import api from "@/services/axios";

export const getCartRequest = async () => {
  const response = await api.get("/commerce/cart");
  return response.data;
};
export const addToCartRequest = async (items) => {
  // console.log(items)
  const response = await api.put("/commerce/addToCart", items);
  return response.data;
};
