import express from "express";
import {
  addOrder,
  deleteOrder,
  getOrder,
  getOrders,
  updateOrder,
} from "../controllers/orders_controller.js";

const router = express.Router();

router.get("/", getOrders);
router.get("/:id", getOrder);
router.post("/add", addOrder);
router.put("/update/:id", updateOrder);
router.delete("/delete/:id", deleteOrder)

export default router;
