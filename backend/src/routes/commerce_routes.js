import express from "express";

import * as orders from "../controllers/commerce/orders_controller.js";

const router = express.Router();

// ORDERS
router.post("/orders/add", orders.addOrder);
router.put("/orders/update/:id", orders.updateOrder);

export default router;
