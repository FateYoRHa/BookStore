import express from "express";
import { addBook, getBook, getBooks } from "../controllers/books_controller.js";

const router = express.Router();

router.get("/", getBooks);
router.get("/:id", getBook);
router.post("/addBook", addBook);

export default router;
