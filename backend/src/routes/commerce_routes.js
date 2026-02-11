import express from "express";

import * as orders from "../controllers/commerce/orders_controller.js";
import * as cart from "../controllers/commerce/carts_controller.js";

const router = express.Router();

// CARTS
router.put("/cart/add", cart.addToCart)
router.put("/cart/remove", cart.removeFromCart);
// ORDERS
router.post("/orders/add", orders.addOrder);
router.put("/orders/update/:id", orders.updateOrder);

export default router;
