import z from "zod";

export const addCategorySchema = z.object({
  name: z
    .string()
    .min(1, "Category Name is required")
    .max(100, "Category Name must not exceed 100 characters")
    .trim(),

  description: z
    .string()
    .max(500, "Description must not exceed 500 characters")
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
export const updateCategorySchema = z.object({
  name: z
    .string()
    .min(1, "Category Name is required")
    .max(100, "Category Name must not exceed 100 characters")
    .trim(),

  description: z
    .string()
    .max(500, "Description must not exceed 500 characters")
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