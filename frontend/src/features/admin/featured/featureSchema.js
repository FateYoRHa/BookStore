import { z } from "zod";
const objectId = z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ID format.");
export const addFeaturedItemSchema = z
  .object({
    itemId: objectId,

    itemType: z.enum(["Book", "Author", "Category"], {
      required_error: "Item type is required",
    }),

    section: z.string().min(1, "Section is required"),

    startDate: z.coerce.date({
      required_error: "Start date is required",
    }),

    endDate: z.coerce.date({
      required_error: "End date is required",
    }),
  })
  .refine((data) => data.endDate >= data.startDate, {
    message: "End date must be after start date",
    path: ["endDate"],
  });
