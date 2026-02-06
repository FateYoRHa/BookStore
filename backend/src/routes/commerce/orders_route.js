import express from "express";
import { addOrder } from "../../controllers/commerce/orders_controller.js";

const router = express.Router();

// router.get("/", getOrders);
// router.get("/:id", getOrder);
router.post("/add", addOrder);
// router.put("/update/:id", updateOrder);
// router.delete("/delete/:id", deleteOrder)

export default router;
