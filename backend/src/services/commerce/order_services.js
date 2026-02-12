import { Order, Book, Cart } from "../../model/index.js";
import * as inventoryService from "../../services/core/inventory_services.js";

export async function getOrderService(id) {
  return await Order.find({ customer: id })
    .populate("items.book", "title price")
    .sort({ createdAt: -1 });
}

export async function addOrderService(orders) {
  // TODO items will come from cart
  const { customerId, shippingAddress } = orders;

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
    shippingAddress,
    totalAmount,
  });

  await inventoryService.updateInventoryService(orderItems);

  await order.save();
  // TODO checkout session
  // Clear cart
  cart.items = [];
  await cart.save();

  return order;
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
