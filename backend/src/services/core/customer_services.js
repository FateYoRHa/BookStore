import { Customer, Order } from "../../model/index.js";

export async function getCustomerService(id) {
  try {
    const customer = await Customer.findById(id).populate("user", "email role");
    if (!customer) {
      const error = new Error("Customer not found.");
      error.status = 404;
      throw error;
    }
    return customer;
  } catch (error) {
    
  }
}

export async function createCustomerService(customer) {
  const { id, name } = customer;
  return await Customer.create({
    user: id,
    name: name,
  });
}
