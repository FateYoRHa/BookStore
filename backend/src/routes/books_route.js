import express from "express";
import { addBook, deleteBook, getBook, getBooks, updateBook } from "../controllers/books_controller.js";

const router = express.Router();

router.get("/", getBooks);
router.get("/:id", getBook);
router.post("/add", addBook);
router.put("/update/:id", updateBook)
router.delete("/delete/:id", deleteBook)

export default router;
