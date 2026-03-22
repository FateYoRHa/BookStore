import { z } from "zod";

// Reusable primitives
const objectId = z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ID format.");

export const updateBook = z.object({
  title: z
    .string()
    .trim()
    .min(2, "Title must have at least 2 characters.")
    .max(100, "Title exceeds 100 characters."),

  description: z
    .string()
    .trim()
    .max(1500, "Book description exceeds character limit.")
    .optional(),

  author: objectId,

  publisher: z
    .string()
    .trim()
    .min(2, "Publisher must be valid.")
    .max(100, "Publisher exceeds character limit."),

  publicationDate: z.coerce.date({
    invalid_type_error: "Invalid date format.",
  }),

  price: z.coerce
    .number()
    .refine((val) => Number.isInteger(Math.round(val * 100)), {
      message: "Max 2 decimal places",
    })
    .min(0, "Price must be a positive number.")
    .max(100000, "Price exceeds allowed limit."),

  categories: z
    .array(objectId)
    .min(1, "At least one category is required.")
    .max(10, "Too many categories.")
    .optional(),

  newImages: z
    .array(
      z
        .instanceof(File)
        .refine((file) => file.size <= 5 * 1024 * 1024, "Max 5MB")
        .refine(
          (file) =>
            ["image/jpeg", "image/png", "image/webp"].includes(file.type),
          "Invalid file type",
        ),
    )
    .optional(),
  bookCode: z.string(),
});
