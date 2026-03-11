import api from "@/services/axios";

export const getAuthorsRequest = async ({ page, search, limit }) => {
  const response = await api.get("/core/authors", {
    params: { page, search, limit },
  });
  return response.data;
};
