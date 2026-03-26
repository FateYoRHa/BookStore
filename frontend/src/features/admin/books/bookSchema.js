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
  existingImages: z
    .array(
      z.union([
        z.string(), // old string URLs
        z.object({
          url: z.string(),
          public_id: z.string().optional(), // new images may or may not have public_id
          altText: z.string().optional(),
        }),
      ]),
    )
    .optional(),
  removedImages: z
    .array(
      z.string(), // old string URLs
    )
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
export const addBook = z.object({
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

  authorCode: z
    .string({
      required_error: "Author is required.",
      invalid_type_error: "Author is required.",
    })
    .min(1, "Author is required."),
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
    .max(10, "Too many categories."),
  images: z
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
  quantity: z.coerce.number().int().min(1, "Quantity must be greater than 0."),
  pages: z.coerce.number().int().min(50, "Book must have atleast 50 pages."),
  language: z
    .string()
    .trim()
    .min(2, "Language must be valid.")
    .max(50, "Language exceeds character limit."),
});
