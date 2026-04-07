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
export const removeFromCartRequest = async (item) => {
  // console.log(item)
  const response = await api.put("/commerce/removeFromCart", item);
  return response.data;
};

export const clearCartRequest = async () => {
  const response = await api.put("/commerce/clearCart");
  return response.data;
};
