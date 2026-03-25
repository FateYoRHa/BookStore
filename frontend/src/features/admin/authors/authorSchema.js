import { z } from "zod";

export const authorSchema = z.object({
  penName: z
    .string()
    .min(2, "Pen name must be at least 2 characters")
    .max(100, "Pen name too long"),

  bio: z
    .string()
    .max(500, "Bio must be under 500 characters")
    .optional()
    .or(z.literal("")),

  image: z
    .any()
    .refine(
      (file) =>
        !file ||
        (file instanceof File &&
          file.size <= 5 * 1024 * 1024 &&
          ["image/jpeg", "image/png", "image/webp"].includes(file.type)),
      "Invalid image (max 5MB, jpeg/png/webp only)",
    )
    .optional(),
});
export const updateAuthorSchema = z.object({
  penName: z
    .string()
    .min(2, "Pen name must be at least 2 characters")
    .max(100, "Pen name too long"),

  bio: z
    .string()
    .max(500, "Bio must be under 500 characters")
    .optional()
    .or(z.literal("")),

  newImage: z
    .any()
    .refine(
      (file) =>
        !file ||
        (file instanceof File &&
          file.size <= 5 * 1024 * 1024 &&
          ["image/jpeg", "image/png", "image/webp"].includes(file.type)),
      "Invalid image (max 5MB, jpeg/png/webp only)",
    )
    .optional(),
});
