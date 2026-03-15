import z from "zod";

export const postReview = z.object({
  comment: z.string().trim(),
});
