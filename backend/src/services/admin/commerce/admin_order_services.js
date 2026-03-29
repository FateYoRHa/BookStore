import { Order } from "../../../model/index.js";

export async function getAdminOrdersService() {
  const orders = await Order.find()
    .populate({
      path: "items.book",
      model: "Book",
      select: "title price",
      populate: [
        {
          path: "images",
          select: "image",
          match: { type: "cover" },
          perDocumentLimit: 1,
        },
      ],
    })
    .populate("customer", "name customerCode phone")
    .populate("payment")
    .sort({ updatedAt: 1 });
  return orders;
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

export async function getOrderDetailService(orderCode) {
  const order = await Order.findOne({ orderCode: orderCode })
    .populate({
      path: "items.book",
      model: "Book",
      select: "title price",
      populate: [
        {
          path: "images",
          select: "image",
          match: { type: "cover" },
          perDocumentLimit: 1,
        },
      ],
    })
    .populate("customer", "name customerCode phone")
    .populate("payment");
  return order;
}
