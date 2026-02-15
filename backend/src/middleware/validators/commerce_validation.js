import { body } from "express-validator";

export const addToCartValidator = [
  body("bookId").isMongoId(),
  body("quantity").isInt({ min: 1, max: 10 }),
];

export const paymenMethod = [
  body("paymentMethod").isIn(["stripe", "paypal", "cod"])
]
export const validate = [
  body("").notEmpty().withMessage(" is required."),
  body("").notEmpty().withMessage(" is required."),
  body("").notEmpty().withMessage(" is required."),
  body("").notEmpty().withMessage(" is required."),
];