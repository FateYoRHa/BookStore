import { Order, Book, Customer } from "../../model/index.js";
import * as inventoryService from "../../services/core/inventory_services.js";

export async function addOrderService(orders) {
  // TODO items will come from cart
  const { customerId, items, shippingAddress } = orders;

  const customer = await Customer.findById(customerId);
  // TODO redirect to login/signup
  if (!customer) {
    return res
      .status(404)
      .json({ message: "Customer not found, please log in" });
  }
  // * Resolve books & snapshot prices
  const bookIds = items.map((i) => i.bookId);
  const books = await Book.find({ _id: { $in: bookIds } });

  if (books.length !== items.length) {
    return res.status(404).json({ message: "One or more books not found" });
  }
  // cycle through items and save book/s to array
  const orderItems = items.map((item) => {
    const book = books.find((b) => b._id.equals(item.bookId));
    return {
      book: book._id,
      quantity: item.quantity,
      priceSnapshot: book.price,
    };
  });
  // get total price for snapshot
  const totalAmount = orderItems.reduce(
    (sum, i) => sum + i.quantity * i.priceSnapshot,
    0,
  );

  const order = new Order({
    customer: customer._id,
    items: orderItems,
    shippingAddress,
    totalAmount,
  });

  await inventoryService.updateInventoryService(items);

  // TODO checkout session

  await order.save();

  return order;
}

export async function updateOrderService(order) {
  const { id, status } = order;
  const updateOrder = await Order.findOneAndUpdate(
    { orderCode: id },
    { status: status },
    { new: true },
  );
  return updateOrder
}
