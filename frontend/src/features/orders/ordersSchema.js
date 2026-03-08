import z from "zod";
// Helper for Luhn algorithm validation (Basic)
// const isLuhnValid = (cardNumber) => {
//   let sum = 0;
//   let isEven = false;
//   for (let i = cardNumber.length - 1; i >= 0; i--) {
//     let digit = parseInt(cardNumber.charAt(i));
//     if (isEven && (digit *= 2) > 9) digit -= 9;
//     sum += digit;
//     isEven = !isEven;
//   }
//   return sum % 10 === 0;
// };
export const customerInfoSchema = z.object({
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
      .min(2, "Country is required.")
      .max(60, "Country is too long."),
  }),

  payment: z.discriminatedUnion("type", [
    z.object({type: z.literal("CoD")}),
    z.object({
      type: z.literal("gcash"),
      // accountName: z.string().min(2, "Must have atleast 2 characters"),
      // accountNumber: z
      //   .string()
      //   .regex(/^(09|\+639)\d{9}$/, "Invalid phone/account number."),
    }),
    z.object({
      type: z.literal("bank"),
      // bankName: z.string().min(2),
      // accountNumber: z.string().regex(/^\d{8,17}$/),
    }),
    z.object({
      type: z.literal("paypal"),
      // email: z.email("Invalid email address"),
    }),
    z.object({
      type: z.literal("card"),
      // cardHolder: z
      //   .string()
      //   .min(3)
      //   .regex(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces"),
      // cardNumber: z
      //   .string()
      //   .regex(/^\d{13,19}$/)
      //   .refine(isLuhnValid, {
      //     message: "Invalid card number",
      //   })
      //   .refine((val) => isLuhnValid(val.replace(/\s/g, ""))),
      // accountNumber: z.string().regex(/^\d{10,12}$/, "Invalid account number"),
      // expiryDate: z
      //   .string()
      //   .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Expiry must be MM/YY")
      //   .refine(
      //     (val) => {
      //       const [month, year] = val.split("/");
      //       const expiry = new Date(`20${year}`, month);
      //       return expiry > new Date();
      //     },
      //     {
      //       message: "Card has expired",
      //     },
      //   ),
      // cvv: z.string().regex(/^\d{3,4}$/),
    }),
  ]),
  
});
