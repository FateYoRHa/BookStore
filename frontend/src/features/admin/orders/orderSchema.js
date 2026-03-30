import z from "zod";
import { ORDER_STATUS } from "./utils/constantValues";

export const updateOrderSchema = z.object({
  status: z.enum(ORDER_STATUS),
  trackingNumber: z.string().optional(),
  note: z.string().trim().max(100, "Note too long.").optional(),
});
