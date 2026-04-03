import api from "@/services/axios";

export const getFeaturedItemsRequest = async () => {
  const res = await api.get("/admin/featureditems");
  return res.data;
};

export const featureItemRequest = async (item) => {
  const res = await api.post("/admin/featureditems", item);
  return res.data;
};
