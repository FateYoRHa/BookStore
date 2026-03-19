import * as adminOrderService from "../../../services/admin/commerce/admin_order_services.js";

export async function updateOrder(req, res) {
  try {
    const id = req.params.id;
    const { status } = req.body;
    const order = await adminOrderService.updateOrderService({ id, status });
    res.status(200).json(order);
  } catch (error) {
    console.error("Error updating order", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
