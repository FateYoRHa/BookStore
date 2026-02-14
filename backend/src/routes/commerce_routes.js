import express from "express";

import * as orders from "../controllers/commerce/orders_controller.js";
import * as cart from "../controllers/commerce/carts_controller.js";

import { authenticate } from "../middleware/authenticate.js";
import { authorize } from "../middleware/authorize.js";

const router = express.Router();

const adminOnly = [authenticate, authorize("admin")];
const customerOnly = [authenticate, authorize("customer")];

// CARTS
router.put("/cart/add", customerOnly, cart.addToCart);
router.put("/cart/remove", customerOnly, cart.removeFromCart);
// ORDERS
router.post("/orders", customerOnly, orders.addOrder);
router.put("/orders/:id", adminOnly, orders.updateOrder);

export default router;
