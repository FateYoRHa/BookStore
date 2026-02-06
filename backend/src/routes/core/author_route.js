import express from "express";
import {
  addAuthor,
  deleteAuthor,
  getAuthor,
  getAuthors,
  updateAuthor,
} from "../../controllers/core/authors_controller.js";

const router = express.Router();

router.get("/", getAuthors);
router.get("/:id", getAuthor);
router.post("/add", addAuthor);
router.put("/update/:id", updateAuthor);
router.delete("/delete/:id", deleteAuthor);
export default router;
