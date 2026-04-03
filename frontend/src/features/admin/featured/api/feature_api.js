import api from "@/services/axios";

export const featureItemRequest = async (item) => {
  const res = await api.post("/admin/feature", item);
  return res.data;
};
