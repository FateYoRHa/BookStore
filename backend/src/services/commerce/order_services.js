import { Order, Payment, Cart, Customer } from "../../model/index.js";

export async function getOrderService(id) {
  return await Order.find({ customer: id })
    .populate("items.book", "title price")
    .sort({ createdAt: -1 });
}
export async function getCustomerOrdersService(userId) {
  const customerId = await Customer.findOne({ user: userId }, { user: 1 });
  return await Order.find({ customer: customerId })
    .populate({
      path: "items.book",
      select: "bookCode title",
      populate: [{ path: "images", match: { type: "cover" } }],
    })
    .populate("payment", "method")
    .sort({ createdAt: -1 });
}

export async function addOrderService(customer) {
  const { id, address, shippingFee } = customer;
  const customerId = await Customer.findOne({ user: id }, { _id: 1 });
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
    deliveryFee: shippingFee,
  });

  const savedOrder = await order.save();

  return savedOrder;
}
