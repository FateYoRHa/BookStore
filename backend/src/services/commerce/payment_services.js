import { Cart, Order, Payment } from "../../model/index.js";
import * as inventoryService from "../../services/core/inventory_services.js";
import {
  PAYMENT_STATUSES,
  PAYMENT_METHODS,
  ORDER_STATUSES,
} from "../../constants/constant_values.js";
import axios from "axios";

export async function createCheckoutSessionService(orderId, paymentMethod) {
  const order = await Order.findById(orderId).populate("items.book");

  if (!order) {
    throw new Error("Order not found");
  }
  const lineItems = order.items.map((item) => ({
    name: item.book.title, // from populated book
    amount: Math.round(item.priceSnapshot * 100), // PayMongo uses cents
    currency: "PHP",
    quantity: item.quantity,
  }));
  const response = await axios.post(
    "https://api.paymongo.com/v1/checkout_sessions",
    {
      data: {
        attributes: {
          send_email_receipt: true,
          show_description: true,
          show_line_items: true,
          payment_method_types: ["gcash", "card", "qrph"],
          line_items: lineItems,
          success_url: `${process.env.FRONTEND_URL}/commerce/checkout/success`,
          cancel_url: `${process.env.FRONTEND_URL}/commerce/checkout/cancel`,

          metadata: {
            orderId: order._id.toString(),
            customerId: order.customer.toString(),
          },
        },
      },
    },
    {
      auth: {
        username: process.env.PAYMONGO_SECRET_KEY,
        password: "",
      },
    },
  );

  const checkoutSession = response.data.data;
  let method = null;

  for (const key in PAYMENT_METHODS) {
    if (PAYMENT_METHODS[key] === paymentMethod.type) {
      method = PAYMENT_METHODS[key];
      break; // Stop the loop once a match is found
    }
  }
  const payment = await Payment.create({
    order: order._id,
    provider: "paymongo",
    method: method,
    checkoutSessionId: checkoutSession.id,
    amount: order.totalAmount,
    status: PAYMENT_STATUSES.PENDING,
  });

  order.payment = payment._id;
  await order.save();

  return {
    checkoutUrl: checkoutSession.attributes.checkout_url,
  };
}

// TODO COD PAYMENTS
// export async function codPaymentService(orderId) {
//   const order = await Order.findById(orderId);
//   const payment = await Payment.create({
//     order: order._id,
//     provider: "Cash on Delivery",
//     method: "CoD",
//     transactionId: order._id,
//     amount: order.totalAmount,
//     status: PAYMENT_STATUSES.PENDING,
//   });
//   order.payment = payment._id;
//   await order.save();
//   return;
// }

export async function paymentWebhookService(event) {
  const eventType = event.data.attributes.type;
  const session = event?.data?.attributes?.data;
  const paymentData = session?.attributes;
  if (!paymentData) {
    const error = new Error();
    error.status = 400;
    throw error;
  }
  const orderId = paymentData?.metadata?.orderId;
  const checkoutId = session.id;
  // Find Payment record
  const payment = await Payment.findOne({
    checkoutSessionId: checkoutId,
  });
  if (!payment) {
    const error = new Error("Payment not found.");
    error.status = 400;
    throw error;
  }

  // find order
  const order = await Order.findById(payment.order);
  if (order.status === ORDER_STATUSES.PAID) {
    return; // already processed
  }
  const paymentId = paymentData.payments[0].id;
  // Update payment & order based on event type
  switch (eventType) {
    case "checkout_session.payment.paid":
    case "payment.paid":
      payment.transactionId = paymentId;
      payment.status = PAYMENT_STATUSES.PAID;
      payment.method = paymentData.payment_method_used;
      payment.paidAt = new Date();

      await payment.save();

      order.status = ORDER_STATUSES.PAID;
      await order.save();
      // Optional: clear cart
      await inventoryService.updateInventoryService(order.items);
      await Cart.findOneAndUpdate({ customer: order.customer }, { items: [] });
      break;

    case "qrph.expired":
    case "payment.failed":
      payment.status = PAYMENT_STATUSES.FAILED;
      payment.method = paymentData.payment_method_used;
      await payment.save();

      await Order.findByIdAndUpdate(orderId, {
        status: ORDER_STATUSES.FAILED,
      });
      break;
  }

  return;
}
