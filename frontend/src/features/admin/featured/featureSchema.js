import { z } from "zod";

const objectId = z.preprocess(
  (val) => {
    if (typeof val === "object" && val !== null && "_id" in val) {
      return val._id;
    }
    return val;
  },
  z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId"),
);

export const addFeaturedItemSchema = z
  .object({
    itemId: objectId,

    itemType: z.enum(["Book", "Author", "Category"], {
      required_error: "Item type is required",
    }),

    section: z.enum(["hero", "best-seller", "new-arrival"], {
      required_error: "Section is required",
    }),

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
