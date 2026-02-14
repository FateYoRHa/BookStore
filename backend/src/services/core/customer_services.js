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
    return { customer, orders };
  } catch (error) {
    throw error;
  }
}

export async function updateCustomerProfileService(customer) {
  const { id, name, phone, address, image } = customer;
  const updateCustomer = await Customer.findOneAndUpdate(
    { user: id },
    { name, phone, address, image },
    { new: true },
  );
  return updateCustomer;
}

export async function createCustomerService(customer) {
  const { id, name } = customer;
  const newCustomer = new Customer({ user: id, name })

  return await newCustomer.save(); 
}
