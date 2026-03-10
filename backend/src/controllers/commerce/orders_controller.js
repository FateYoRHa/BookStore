import * as orderService from "../../services/commerce/order_services.js";

export async function addOrder(req, res) {
  try {
    // TODO items will come from cart
    const { customerId, shippingAddress } = req.body;
    const order = await orderService.addOrderService({
      customerId,
      shippingAddress,
    });

    res.status(201).json(order);
  } catch (error) {
    console.error("Error creating order", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function updateOrder(req, res) {
  try {
    const id = req.params.id;
    const { status } = req.body;
    const order = await orderService.updateOrderService({ id, status });
    res.status(200).json(order);
  } catch (error) {
    console.error("Error updating order", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getCustomerOrders(req, res) {
  try {
    const userId = req.user.id;
    const orders = await orderService.getCustomerOrdersService(userId);
    res.status(200).json(orders);
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ message: error.message || "Internal Server Error." });
  }
}
