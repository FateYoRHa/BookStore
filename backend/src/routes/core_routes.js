import express from "express";

import * as author from "../controllers/core/authors_controller.js";
import * as book from "../controllers/core/books_controller.js";
import * as category from "../controllers/core/category_controller.js";
import * as customer from "../controllers/core/customers_controller.js";

import { authenticate } from "../middleware/authenticate.js";
import { authorize } from "../middleware/authorize.js";
import { uploadImage, requireFile } from "../middleware/upload.js";

const router = express.Router();

const adminOnly = [authenticate, authorize("admin")];
const customerOnly = [authenticate, authorize("customer")];

// AUTHORS
router.get("/authors/", author.getAuthors);
router.get("/authors/:id", author.getAuthor);
router.post("/authors", adminOnly, author.addAuthor);
router.put("/authors/:id", adminOnly, author.updateAuthor);
router.delete("/atuhors/:id", adminOnly, author.deleteAuthor);

// BOOKS
router.get("/books/", book.getBooks);
router.get("/books/:id", book.getBook);
router.post("/books", adminOnly, book.addBook);
router.put("/books/:id", adminOnly, book.updateBook);

// CATEGORIES
router.get("/categories/", category.getCategories);
router.get("/categories/:id", category.getCategory);
router.post("/categories", adminOnly, category.addCategory);
router.put("/categories/:id", adminOnly, category.updateCategory);
router.delete("/categories/:id", adminOnly, category.deleteCategory);
// CUSTOMERS

router.get(
  "/customers/me",
  customerOnly,
  customer.getCustomer, //ID will be based from req.user.id
);
// CUSTOMERS
// get all customer
router.get("/customers", adminOnly, customer.getCustomers);
// update profile (current user)
router.put("/customers", customerOnly, customer.updateCustomerProfile);
// update profile pic
router.patch(
  "/profile/image",
  customerOnly,
  uploadImage.single("image"),
  requireFile("Image"),
  customer.updateProfileImage,
);
export default router;
