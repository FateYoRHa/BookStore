import { body } from "express-validator";

export const validateUser = [
  body("email")
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage("Please enter a valid email address."),

  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must have at least 8 characters long")
    .matches(/[a-z]/)
    .withMessage("Password must contain at least one lowercase letter")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one Upper Case letter")
    .matches(/[0-9]/)
    .withMessage("Password must contain at least one number")
    .matches(/[!@#$%^&*_\-]/)
    .withMessage("Password must contain at least one special character"),
];
export const validateLogin = [
  body("email")
    .notEmpty()
    .withMessage("Email cannot be empty.")
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage("Please enter a valid email address."),
  body("password").notEmpty().withMessage("Password cannot be empty."),
];

// export default { validateUser, validateLogin };
