import * as customerService from "../../../services/core/customer_services.js";
export async function getCustomers(req, res) {
  try {
    const customer = await customerService.getCustomersService();

    res.status(200).json(customer);
  } catch (error) {
    console.log("Error retrieving customer", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}