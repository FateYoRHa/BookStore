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

export async function updateCustomerProfile(req, res) {
  try {
    const { name, phone, address, image } = req.body;
    // req.user.id comes from authenticate(req.user = user)
    const id = req.user.id;
    const customer = await customerService.updateCustomerProfileService({
      id,
      name,
      phone,
      address,
      image,
    });
    res.status(200).json(customer)
  } catch (error) {
    console.log("Error retrieving customer", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
