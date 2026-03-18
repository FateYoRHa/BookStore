import api from "@/services/axios";

export const addWishlistRequest = async (book) => {
  const response = await api.put("/engagement/wishlist", book);
  return response.data;
};

export const getWishlistRequest = async () => {
  const response = await api.get("/engagement/wishlist");
  return response.data;
};