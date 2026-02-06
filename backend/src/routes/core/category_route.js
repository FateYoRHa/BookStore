import express from "express";

import {
  getCategories,
  getCategory,
  addCategory,
  updateCategory,
  deleteCategory,
} from "../../controllers/core/category_controller.js";

const router = express.Router();

router.get("/", getCategories);
router.get("/:id", getCategory);
router.post("/add", addCategory);
router.put("/update/:id", updateCategory);
router.delete("/delete/:id", deleteCategory);

export default router;
