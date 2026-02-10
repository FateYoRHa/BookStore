import express from "express";

import * as author from "../controllers/core/authors_controller.js"
import * as book from "../controllers/core/books_controller.js";
import * as category from "../controllers/core/category_controller.js";
import * as customer from "../controllers/core/customers_controller.js";

const router = express.Router();

// AUTHORS
router.get("/core/authors/", author.getAuthors);
router.get("/core/authors/:id", author.getAuthor);
router.post("/core/authors/add", author.addAuthor);
router.put("/core/authors/update/:id", author.updateAuthor);
router.delete("/core/atuhors/delete/:id", author.deleteAuthor);

// BOOKS
router.get("/core/books/", book.getBooks);
router.get("/core/books/:id", book.getBook);
router.post("/core/books/add", book.addBook);
router.put("/core/books/update/:id", book.updateBook);

// CATEGORIES
router.get("/core/categories/", category.getCategories);
router.get("/core/categories/:id", category.getCategory);
router.post("/core/categories/add", category.addCategory);
router.put("/core/categories/update/:id", category.updateCategory);
router.delete("/core/categories/delete/:id", category.deleteCategory);
// CUSTOMERS
router.get("/core/customers/:id", customer.getCustomer);

export default router;