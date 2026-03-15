import api from "@/services/axios";

export const postReviewRequest = async (review) => {
  const response = await api.post("/engagement/review", review);
  return response.data;
};
