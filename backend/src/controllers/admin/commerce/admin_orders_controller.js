import * as adminOrderService from "../../../services/admin/commerce/admin_order_services.js";

export async function getAdminOrders(req, res) {
  try {
    const orders = await adminOrderService.getAdminOrdersService();
    res.status(200).json(orders);
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ message: error.message || "Internal Server Error" });
  }
}
export async function updateOrder(req, res) {
  try {
    const id = req.params.id;
    const { status, trackingNumber, note } = req.body;
    const order = await adminOrderService.updateOrderService({
      id,
      status,
      trackingNumber,
      note,
    });
    res.status(200).json(order);
  } catch (error) {
    console.error("Error updating order", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
export async function getOrderDetail(req, res) {
  try {
    const orderCode = req.params.id;
    const order = await adminOrderService.getOrderDetailService(orderCode);
    res.status(200).json(order);
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ message: error.message || "Internal Server Error." });
  }
}
