import { Customer, Order } from "../../model/index.js";
import * as orderService from "../../services/commerce/order_services.js";
export async function getCustomerService(id) {
  try {
    const customer = await Customer.findOne({ user: id }).populate(
      "user",
      "email role",
    );
    const orders = await orderService.getOrderService(customer.id);
    if (!customer) {
      const error = new Error("Customer not found.");
      error.status = 404;
      throw error;
    }
    return {customer, orders};
  } catch (error) {
    throw error
  }
}

export async function createCustomerService(customer) {
  const { id, name } = customer;
  return await Customer.create({
    user: id,
    name: name,
  });
}
