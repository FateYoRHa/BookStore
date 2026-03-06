import { Order, Payment } from "../../model/index.js";
import {
  PAYMENT_STATUSES,
  PAYMENT_METHODS,
} from "../../constants/constant_values.js";
import axios from "axios";

export async function createCheckoutSessionService(orderId, paymentMethod) {
  const order = await Order.findById(orderId);

  if (!order) {
    throw new Error("Order not found");
  }

  const response = await axios.post(
    "https://api.paymongo.com/v1/checkout_sessions",
    {
      data: {
        attributes: {
          send_email_receipt: true,
          show_description: true,
          show_line_items: true,
          payment_method_types: ["gcash", "card", "qrph"],
          line_items: [
            {
              currency: "PHP",
              amount: Math.round(order.totalAmount * 100),
              name: "Bookstore Order",
              quantity: 1,
            },
          ],

          success_url: `${process.env.FRONTEND_URL}/commerce/checkout/success`,
          cancel_url: `${process.env.FRONTEND_URL}/commerce/checkout/cancel`,

          metadata: {
            orderId: order._id.toString(),
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
    transactionId: checkoutSession.id,
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
  const paymentData = event?.data?.attributes?.data?.attributes;
  if (!paymentData) {
    const error = new Error();
    error.status = 400;
    throw error;
  }
  const orderId = paymentData.metadata.orderId;
  const transactionId = paymentData.id;

  // Find Payment record
  const payment = await Payment.findOne({ transactionId });
  if (!payment) {
    const error = new Error();
    error.status = 400;
    throw error;
  }
  // Update payment & order based on event type
  switch (event.data.attributes.type) {
    case "checkout_session.payment.paid":
    case "payment.paid":
      payment.status = PAYMENT_STATUSES.PAID;
      payment.paidAt = new Date();
      await payment.save();

      await Order.findByIdAndUpdate(orderId, {
        status: ORDER_STATUSES.PAID,
        paymentStatus: PAYMENT_STATUSES.PAID,
      });

      // Optional: clear cart
      const order = await Order.findById(payment.order);
      await Cart.findOneAndUpdate({ customer: order.customer }, { items: [] });
      break;

    case "qrph.expired":
    case "payment.failed":
      payment.status = "failed";
      await payment.save();

      await Order.findByIdAndUpdate(orderId, {
        status: ORDER_STATUSES.FAILED,
        paymentStatus: PAYMENT_STATUSES.FAILED,
      });
      break;
  }

  return;
}
