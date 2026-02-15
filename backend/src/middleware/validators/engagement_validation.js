import { body } from "express-validator";

export const createReviewValidator = [
  body("bookId").isMongoId(),
  body("rating").isInt({ min: 1, max: 5 }),
  body("comment").optional().trim().isLength({ max: 1000 }),
];

export const wishlistValidator = [body("book").isMongoId()];
export const newsletterValidator = [body("email").isEmail().normalizeEmail()];

