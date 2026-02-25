import express from "express";

import * as orders from "../controllers/commerce/orders_controller.js";
import * as cart from "../controllers/commerce/carts_controller.js";

import { authenticate } from "../middleware/authenticate.js";
import { authorize } from "../middleware/authorize.js";

const router = express.Router();

const adminOnly = [authenticate, authorize("admin")];
const customerOnly = [authenticate, authorize("customer")];

// CARTS
router.get("/cart", customerOnly, cart.getCart)
router.put("/addToCart", customerOnly, cart.addToCart);
router.put("/removeFromCart", customerOnly, cart.removeFromCart);
router.put("/clearCart", customerOnly, cart.clearCart)
router.post("/checkout", customerOnly, cart.checkout)
// ORDERS
router.post("/orders", customerOnly, orders.addOrder);
router.put("/orders/:id", adminOnly, orders.updateOrder);

export default router;
