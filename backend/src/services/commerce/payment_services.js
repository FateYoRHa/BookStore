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
  const expiresAt = Math.floor(Date.now() / 1000) + 15 * 60; // 15 minutes

  if (!order) {
    throw new Error("Order not found");
  }
  const lineItems = order.items.map((item) => ({
    name: item.book.title, // from populated book
    amount: Math.round(item.priceSnapshot * 100), // PayMongo uses cents
    currency: "PHP",
    quantity: item.quantity,
  }));
  let method = null;

  for (const key in PAYMENT_METHODS) {
    if (PAYMENT_METHODS[key] === paymentMethod.type) {
      method = PAYMENT_METHODS[key];
      break; // Stop the loop once a match is found
    }
  }
  if (["gcash", "card", "qrph"].includes(method)) {
    const response = await axios.post(
      "https://api.paymongo.com/v1/checkout_sessions",
      {
        data: {
          attributes: {
            send_email_receipt: true,
            show_description: true,
            show_line_items: true,
            payment_method_types: [method],
            line_items: lineItems,
            success_url: `${process.env.FRONTEND_URL}/commerce/checkout/success`,
            cancel_url: `${process.env.FRONTEND_URL}/commerce/checkout/cancel`,
            expires_at: expiresAt,
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
  if (method === "CoD") {
    order.status = ORDER_STATUSES.PENDING;
    await order.save();
    await Payment.create({
      order: order._id,
      provider: "Cash on Delivery",
      method: method,
      checkoutSessionId: order._id,
      transactionId: order._id,
      amount: order.totalAmount,
      status: PAYMENT_STATUSES.PENDING,
    });
    await inventoryService.updateInventoryService(order.items);
    await Cart.findOneAndUpdate({ customer: order.customer }, { items: [] });

    return {
      type: "CoD",
      message: "Order placed. Pay on delivery.",
    };
  }
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

// export async function paymentWebhookService(event) {
//   const eventType = event?.data?.attributes?.type;
//   console.log("SESSIOn", eventType);
//   const session = event?.data?.attributes?.data;
//   // console.log("SESSIOn", session);
//   const paymentData = session?.attributes;

//   console.log("DATA", paymentData);
//   if (!paymentData) {
//     const error = new Error();
//     error.status = 400;
//     throw error;
//   }
//   const checkoutId = session?.id;
//   // Find Payment record
//   const payment = await Payment.findOne({
//     checkoutSessionId: checkoutId,
//   });
//   if (!payment) {
//     const error = new Error("Payment not found.");
//     error.status = 400;
//     throw error;
//   }

//   // find order
//   const order = await Order.findById(payment.order);
//   if (order.status === ORDER_STATUSES.PAID) {
//     return; // already processed
//   }
//   // Update payment & order based on event type
//   switch (eventType) {
//     case "checkout_session.payment.paid": {
//       const paymentId = paymentData.payments[0].id;
//       payment.transactionId = paymentId;
//       payment.status = PAYMENT_STATUSES.PAID;
//       payment.method = paymentData.payment_method_used;
//       payment.paidAt = new Date();

//       await payment.save();

//       order.status = ORDER_STATUSES.PAID;
//       await order.save();
//       // Optional: clear cart
//       await inventoryService.updateInventoryService(order.items);
//       await Cart.findOneAndUpdate({ customer: order.customer }, { items: [] });
//       break;
//     }
//     case "payment.failed":
//     case "qrph.expired": {
//       // const orderId = event.attributes.resource.attributes.metadata.checkout_id;
//       const checkoutId = session.id;

//       const payment = await Payment.findOne({
//         checkoutSessionId: checkoutId,
//       });

//       payment.status = PAYMENT_STATUSES.FAILED;
//       await payment.save();

//       order.status = ORDER_STATUSES.FAILED;
//       await order.save();

//       break;
//     }
//   }
//   return;
// }
export async function paymentWebhookService(event) {
  const eventType = event?.data?.attributes?.type;
  const session = event?.data?.attributes?.data;
  const paymentData = session?.attributes;

  const orderId = paymentData.external_reference_number;
  console.log(paymentData);
  if (!paymentData) {
    const error = new Error();
    error.status = 400;
    throw error;
  }
  if (!session) {
    const error = new Error("Invalid webhook payload");
    error.status = 400;
    throw error;
  }
  // Update payment & order based on event type
  switch (eventType) {
    case "checkout_session.payment.paid":
    case "payment.paid": {
      const checkoutId = session?.id;
      // Find Payment record
      const payment = await Payment.findOne({
        checkoutSessionId: checkoutId,
      });
      if (!payment) throw new Error("Payment not found.");

      // find order
      const order = await Order.findById(payment.order);
      if (order.status === ORDER_STATUSES.PAID) {
        return; // already processed
      }
      const paymentId = paymentData.payments[0].id;
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
    }
    case "qrph.expired":
    // ! TO FIX PAYMENT FAILED
    case "checkout_session.expired": {
      // Find Payment record
      const checkoutId = paymentData.id;
      const payment = await Payment.findOne({
        checkoutSessionId: checkoutId,
      });
      if (!payment) throw new Error("Payment not found.");
      // find order
      const order = await Order.findById(payment.order);
      payment.status = PAYMENT_STATUSES.FAILED;
      payment.method = paymentData.payment_method_used;
      await payment.save();
      order.status = ORDER_STATUSES.FAILED;
      await order.save();
      break;
    }
  }

  return;
}
