import api from "@/services/axios";

export const getCartRequest = async (user) => {
  const response = await api.get("/commerce/cart", {
    headers: {
      Authorization: `Bearer ${user.accessToken}`,
    },
  });
  return response.data;
};
export const addToCartRequest = async (user, items) => {
  // console.log(items)
  const response = await api.put("/commerce/addToCart", items, {
    headers: {
      Authorization: `Bearer ${user.accessToken}`,
    },
  });
  return response.data;
};
