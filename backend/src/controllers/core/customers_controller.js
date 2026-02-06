import { Customer, Order } from "../../model/index.js";

export async function getCustomer(req, res) {
  try {
    const customer = await Customer.findById(req.params.id).populate(
      "user",
      "email role",
    );

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    const orders = await Order.find({ customer: customer._id })
      .populate("items.book", "title price")
      .sort({ createdAt: -1 });

    res.status(200).json({ customer, orders });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}
