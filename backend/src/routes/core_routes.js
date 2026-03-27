import express from "express";

import * as author from "../controllers/core/authors_controller.js";
import * as book from "../controllers/core/books_controller.js";
import * as category from "../controllers/core/category_controller.js";
import * as customer from "../controllers/core/customers_controller.js";

import { uploadImage, requireFile } from "../middleware/upload.js";
import { customerOnly } from "../middleware/roles.js";

const router = express.Router();

// AUTHORS
router.get("/authors", author.getAuthors);
router.get("/authors/:id", author.getAuthor);

// BOOKS
router.get("/books", book.getBooks);
router.get("/books/:id", book.getBook);

// CATEGORIES
router.get("/categories", category.getCategories);
// CUSTOMERS

router.get(
  "/customers/profile",
  customerOnly,
  customer.getCustomer, //ID will be based from req.user.id
);
// CUSTOMERS
// update profile (current user)
router.put("/customers", customerOnly, customer.updateCustomerProfile);
// update profile pic
router.patch(
  "/customers/profile/image",
  customerOnly,
  uploadImage.single("image"),
  requireFile("Image"),
  customer.updateProfileImage,
);
export default router;
