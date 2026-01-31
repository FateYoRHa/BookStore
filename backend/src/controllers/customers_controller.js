import Customer from "../model/Customer.js";
import Order from "../model/Order.js";
export async function getCustomers(req, res) {
  try {
    const customers = await Customer.find();
    res.status(200).json(customers);
  } catch (error) {
    console.log("Error retrieving customers", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
export async function getCustomer(req, res) {
  try {
    const customer = await Customer.findOne({ customerId: req.params.id });
    const orders = await Order.find({ customerId: req.params.id });
    res.status(200).json({customer, orders});
  } catch (error) {
    console.log("Error retrieving customer data", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
export async function addCustomer(req, res) {
  try {
    const { name, email, password, address, contactNumber } = req.body;
    const customer = new Customer({
      name,
      email,
      password,
      address,
      contactNumber,
    });
    await customer.save();
    res.status(201).json(customer);
  } catch (error) {
    console.log("Error adding customer", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
export async function updateCustomer(req, res) {
  try {
    const { name, email, password, address, contactNumber } = req.body;
    const customer = await Customer.findOneAndUpdate(
      { customerId: req.params.id },
      { name, email, password, address, contactNumber },
      { upsert: true, new: true },
    );
    res.status(200).json(customer);
  } catch (error) {
    console.log("Error updating customer", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
export async function deleteCustomer(req, res) {
  const orders = await Order.find({ customerId: req.params.id });
  if (orders.length > 0) return res.status(405).json({ message: "Customer has unresolved orders" });
  await Customer.findOneAndDelete({ customerId: req.params.id });
  res.status(200).json({ message: "Customer was deleted Successfully" });
  try {
  } catch (error) {
    console.log("Error deleting customer", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
