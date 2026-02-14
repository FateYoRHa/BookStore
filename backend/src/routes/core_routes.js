import express from "express";

import * as author from "../controllers/core/authors_controller.js";
import * as book from "../controllers/core/books_controller.js";
import * as category from "../controllers/core/category_controller.js";
import * as customer from "../controllers/core/customers_controller.js";

import { authenticate } from "../middleware/authenticate.js";

const router = express.Router();

// AUTHORS
router.get("/authors/", author.getAuthors);
router.get("/authors/:id", author.getAuthor);
router.post("/authors/add", authenticate, author.addAuthor);
router.put("/authors/update/:id", authenticate, author.updateAuthor);
router.delete("/atuhors/delete/:id", authenticate, author.deleteAuthor);

// BOOKS
router.get("/books/", book.getBooks);
router.get("/books/:id", book.getBook);
router.post("/books/add", authenticate, book.addBook);
router.put("/books/update/:id", authenticate, book.updateBook);

// CATEGORIES
router.get("/categories/", category.getCategories);
router.get("/categories/:id", category.getCategory);
router.post("/categories/add", authenticate, category.addCategory);
router.put("/categories/update/:id", authenticate, category.updateCategory);
router.delete("/categories/delete/:id", authenticate, category.deleteCategory);
// CUSTOMERS
router.get("/customers", authenticate, customer.getCustomer);
router.put("/customers/update", authenticate, customer.updateCustomerProfile);
export default router;
