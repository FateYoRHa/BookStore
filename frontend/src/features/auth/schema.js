// features/auth/schema.js
import { z } from "zod";

// login validations

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),

});
