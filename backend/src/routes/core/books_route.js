import express from "express";
import {
  addBook,
  getBook,
  getBooks,
  updateBook,
} from "../../controllers/core/books_controller.js";

const router = express.Router();

router.get("/", getBooks);
router.get("/:id", getBook);
router.post("/add", addBook);
router.put("/update/:id", updateBook)

export default router;
