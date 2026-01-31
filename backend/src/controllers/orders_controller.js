import Order from "../model/Order.js";
import Book from "../model/Book.js";

export async function getOrders(req, res) {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    console.log("Error retrieving orders", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getOrder(req, res) {
  try {
    const order = await Order.findOne(req.params.id);
    res.status(201).json(order);
  } catch (error) {
    console.log("Error retrieving order", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function addOrder(req, res) {
  try {
    const { customerId, items, shippingDetails } = req.body;

    // this checks if the item/s are in
    const foundBooks = await Book.find({
      bookId: { $in: items.map((i) => i.trim()) },
    });

    if (foundBooks.length !== items.length) {
      return res.status(404).json({
        message: "One or more books not found",
      });
    }
    //THIS RETURNS Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
    // items.forEach(async (item) => {
    //   if (await Book.findOne({ bookId: item.trim() })) return;
    //   return res.status(404).send({ message: `${item} not found` });
    // });
    const order = new Order({
      customerId,
      items,
      shippingDetails,
    });
    await order.save();
    res.status(201).json(order);
  } catch (error) {
    console.log("Error creating order", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function updateOrder(req, res) {
  try {
    const { items, shippingDetails } = req.body;

    // this checks if the items are in
    const foundBooks = await Book.find({
      bookId: { $in: items.map((i) => i.trim()) },
    });

    if (foundBooks.length !== items.length) {
      return res.status(404).json({
        message: "One or more books not found",
      });
    }

    const order = await Order.findOneAndUpdate(
      { orderId: req.params.id },
      {
        items,
        shippingDetails,
        $set: { updatedAt: Date.now() },
      },
      {
        upsert: true,
        new: true,
      },
    );
    res.status(200).json(order);
  } catch (error) {
    console.log("Error creating order", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function deleteOrder(req, res) {
  try {
    await Order.findOneAndDelete({ orderId: req.params.id });
    res.status(200).json({ message: "Order was deleted successfully" });
  } catch (error) {
    console.log("Error creating order", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
