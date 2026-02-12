import * as customerService from "../../services/core/customer_services.js"
import * as orderService from "../../services/commerce/order_services.js"

export async function getCustomer(req, res) {
  try {
    const customer = await customerService.getCustomerService(req.params.id)

    const orders = await orderService.getOrderService(req.params.id);

    res.status(200).json({ customer, orders });
  } catch (error) {
    console.log("Error retrieving customer", error)
    res.status(500).json({ message: "Internal Server Error" });
  }
}

