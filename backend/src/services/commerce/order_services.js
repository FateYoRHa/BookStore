import { Order, Payment, Cart } from "../../model/index.js";
import * as inventoryService from "../../services/core/inventory_services.js";
import {
  ORDER_STATUSES,
  PAYMENT_METHODS,
  PAYMENT_PROVIDERS,
  PAYMENT_STATUSES,
} from "../../constants/constant_values.js";
import axios from "axios";

export async function getOrderService(id) {
  return await Order.find({ customer: id })
    .populate("items.book", "title price")
    .sort({ createdAt: -1 });
}

export async function addOrderService(customer) {
  const { customerId, address, shippingFee, paymentMethod } = customer;
  const cart = await Cart.findOne({ customer: customerId });
  if (!cart || cart.items.length === 0) {
    throw new Error("Cart is empty");
  }
  // cycle through items and save book/s to array
  const orderItems = cart.items.map((item) => ({
    book: item.book,
    quantity: item.quantity,
    priceSnapshot: item.priceSnapshot,
  }));
  // get total price for snapshot
  const totalAmount = orderItems.reduce(
    (sum, i) => sum + i.quantity * i.priceSnapshot,
    0,
  );

  const order = new Order({
    customer: customerId,
    items: orderItems,
    shippingAddress: address,
    totalAmount: totalAmount + shippingFee,
  });

  await inventoryService.updateInventoryService(orderItems);

  const savedOrder = await order.save();
  const paymentIntentResponse = await axios.post(
    "https://api.paymongo.com/v1/payment_intents",
    {
      data: {
        attributes: {
          amount: Math.round(totalAmount * 100), // PHP cents
          currency: "PHP",
          payment_method_allowed: ["gcash", "card", "qrph"],
          payment_method_options: { card: { request_three_d_secure: "any" } },
          metadata: { orderId: savedOrder._id.toString() },
        },
      },
    },
    { auth: { username: process.env.PAYMONGO_SECRET_KEY, password: "" } },
  );

  const paymentIntent = paymentIntentResponse.data.data;

  let method = null;

  for (const key in PAYMENT_METHODS) {
    if (PAYMENT_METHODS[key] === paymentMethod.type) {
      method = PAYMENT_METHODS[key];
      break; // Stop the loop once a match is found
    }
  }

  const payment = await Payment.create({
    order: savedOrder._id,
    provider: "paymongo",
    method: method,
    transactionId: paymentIntent.id,
    amount: savedOrder.totalAmount,
    status: PAYMENT_STATUSES.PENDING,
  });
  console.log(paymentIntent.id);

  order.payment = payment._id;
  await order.save();
  const orderId = order._id;
  const paymentIntentId = paymentIntent.id;
  const clientKey = paymentIntent.attributes.client_key;

  return {
    orderId,
    paymentIntentId,
    clientKey,
  };
}

export async function updateOrderService(order) {
  const { id, status } = order;
  const updateOrder = await Order.findOneAndUpdate(
    { orderCode: id },
    { status: status },
    { new: true },
  );
  return updateOrder;
}

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
