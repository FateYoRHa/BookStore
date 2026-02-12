import express from "express";

import * as author from "../controllers/core/authors_controller.js"
import * as book from "../controllers/core/books_controller.js";
import * as category from "../controllers/core/category_controller.js";
import * as customer from "../controllers/core/customers_controller.js";

const router = express.Router();

// AUTHORS
router.get("/authors/", author.getAuthors);
router.get("/authors/:id", author.getAuthor);
router.post("/authors/add", author.addAuthor);
router.put("/authors/update/:id", author.updateAuthor);
router.delete("/atuhors/delete/:id", author.deleteAuthor);

// BOOKS
router.get("/books/", book.getBooks);
router.get("/books/:id", book.getBook);
router.post("/books/add", book.addBook);
router.put("/books/update/:id", book.updateBook);

// CATEGORIES
router.get("/categories/", category.getCategories);
router.get("/categories/:id", category.getCategory);
router.post("/categories/add", category.addCategory);
router.put("/categories/update/:id", category.updateCategory);
router.delete("/categories/delete/:id", category.deleteCategory);
// CUSTOMERS
router.get("/customers/:id", customer.getCustomer);

export default router;