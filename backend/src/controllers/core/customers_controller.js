import * as customerService from "../../services/core/customer_services.js";

export async function getCustomer(req, res) {
  try {
    const { customer, orders } = await customerService.getCustomerService(
      req.user.id,
    );

    res.status(200).json({ customer, orders });
  } catch (error) {
    console.log("Error retrieving customer", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

