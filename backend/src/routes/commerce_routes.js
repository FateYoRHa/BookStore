import express from "express";

import * as orders from "../controllers/commerce/orders_controller.js";
import * as cart from "../controllers/commerce/carts_controller.js";
import * as payment from "../controllers/commerce/payments_controller.js";

import { adminOnly, customerOnly } from "../middleware/roles.js";

const router = express.Router();

// CARTS
router.get("/cart", customerOnly, cart.getCart);
router.put("/addToCart", customerOnly, cart.addToCart);
router.put("/removeFromCart", customerOnly, cart.removeFromCart);
router.put("/clearCart", customerOnly, cart.clearCart);
router.post("/checkout", customerOnly, cart.checkout);
// ORDERS
router.post("/orders", customerOnly, orders.addOrder);
router.get("/customer/orders", customerOnly, orders.getCustomerOrders);

// PAYMENT
router.post("/payment", customerOnly, payment.checkout);
router.post("/payment/webhook", payment.paymentWebhook);
router.get("/checkout/success", payment.checkoutSuccess);
router.get("/checkout/cancel", payment.checkoutFail);

export default router;
