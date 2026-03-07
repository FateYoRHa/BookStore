import { addOrderService } from "../../services/commerce/order_services.js";
import {
  createCheckoutSessionService,
  paymentWebhookService,
} from "../../services/commerce/payment_services.js";

export async function checkout(req, res) {
  const { address, shippingFee, paymentMethod } = req.body;
  const id = req.user.id;
  const order = await addOrderService({
    id,
    address,
    shippingFee,
    paymentMethod,
  });
  const orderId = order._id;
  const session = await createCheckoutSessionService(orderId, paymentMethod);

  res.json({
    orderId: order._id,
    checkoutUrl: session.checkoutUrl,
  });
}

export async function paymentWebhook(req, res) {
  try {
    await paymentWebhookService(req.body);
    return res.status(200);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
}

export async function checkoutSuccess(req, res) {
  try {
    res.redirect("http://localhost:5173/checkout/success");
  } catch (error) {
    res.status(500).json("Internal server error");
  }
}
export async function checkoutFail(req, res) {
  try {
    res.redirect("http://localhost:5173/checkout/failed");
  } catch (error) {
    res.status(500).json("Internal server error");
  }
}
