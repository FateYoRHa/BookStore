import z from "zod";

export const updateCustomer = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z
    .string()
    .regex(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/, {
      message: "Invalid phone number.",
    })
    .min(10, { message: "Invalid phone number." })
    .max(14, { message: "Invalid phone number." }),
  address: z.object({
    street: z
      .string()
      .trim()
      .min(3, { message: "Invalid street name." })
      .max(120, "Street address is too long."),
    city: z
      .string()
      .trim()
      .min(1, { message: "Invalid city name." })
      .max(60, { message: "City name too long." }),
    zipCode: z
      .string()
      .trim()
      .regex(/^\d{3,9}$/, {
        message: "Invalid zip code.",
      }),
    country: z
      .string()
      .trim()
      .trim()
      .min(2, "Country is required.")
      .max(60, "Country is too long."),
  }),
});
