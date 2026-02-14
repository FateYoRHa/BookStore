import express from "express";

import * as orders from "../controllers/commerce/orders_controller.js";
import * as cart from "../controllers/commerce/carts_controller.js";

import { authenticate } from "../middleware/authenticate.js";

const router = express.Router();

// CARTS
router.put("/cart/add", cart.addToCart);
router.put("/cart/remove", cart.removeFromCart);
// ORDERS
router.post("/orders/add", authenticate, orders.addOrder);
router.put("/orders/update/:id", authenticate, orders.updateOrder);

export default router;
