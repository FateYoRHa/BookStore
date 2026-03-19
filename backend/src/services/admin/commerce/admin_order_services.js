import { Order } from "../../../model/index.js";

export async function updateOrderService(order) {
  const { id, status } = order;
  const updateOrder = await Order.findOneAndUpdate(
    { orderCode: id },
    { status: status },
    { new: true },
  );
  return updateOrder;
}
