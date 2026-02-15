import { body } from "express-validator";

export const validateCustomer = [
  body("name")
    .notEmpty()
    .withMessage("This field is required.")
    .isLength({ max: 20 })
    .withMessage("Name must have less than or equal to 20 characters."),

  body("phone")
    .isMobilePhone("any", { strictMode: false })
    .withMessage("Invalid phone number."),

  // ADDRESS
  body("address.*.street").notEmpty().withMessage("Street is required."),
  body("address.*.city")
    .notEmpty()
    .withMessage("City is required.")
    .isAlpha()
    .withMessage("Invalid City."),
  body("address.*.zipCode")
    .notEmpty()
    .withMessage("Zip Code is required.")
    .isPostalCode()
    .withMessage("Invalid Zip Code."),
  body("address.*.country")
    .notEmpty()
    .withMessage("Country is required.")
    .isAlpha()
    .withMessage("Must be a valid country."),
];

export const validateAuthor = [
  body("penName").notEmpty().withMessage("Author Name is required."),
  body("bio")
    .optional()
    .isLength({ max: 3000 })
    .withMessage("Too long."),
];

export const validateCategory = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Category name is required.")
    .isLength({ min: 2, max: 50 })
    .withMessage("Category must atleast have 2 characters"),
  body("description").optional().withMessage("Description is required."),
];

export const validateBook = [
  body("title").notEmpty().withMessage("Title is required."),
  body("description").optional().isLength({ max: 5000 }),
  body("publisher").notEmpty().withMessage("Publisher is required."),
  body("publicationDate")
    .optional()
    .isISO8601()
    .withMessage("Invalid date format. Must be ISO 8601."),
  body("price")
    .notEmpty()
    .withMessage("Price is required.")
    .isNumeric({ gt: 0 })
    .withMessage("Invalid Price. Must be greater than 0."),
  body(stock)
    .notEmpty()
    .withMessage("Stock is required.")
    .isInt({ gt: 0 })
    .withMessage("Must be greater than 0."),
  body("categories").isMongoId().withMessage("Invalid Category."),
  body("author").isMongoId().withMessage("Invalid Author."),
  body("images").optional().isURL().withMessage("Must be a valid URL."),
  body("isActive").optional().isBoolean(),
];
