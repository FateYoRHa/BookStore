import { Order, Book, Customer, Inventory } from "../../model/index.js";

export async function addOrder(req, res) {
  try {
    // TODO items will come from cart
    const { customerId, items, shippingAddress } = req.body;

    const customer = await Customer.findById(customerId);
    // TODO redirect to login/signup
    if (!customer) {
      return res
        .status(404)
        .json({ message: "Customer not found, please log in" });
    }
    // * Resolve books & snapshot prices
    const bookIds = items.map((i) => i.bookId);
    const books = await Book.find({ _id: { $in: bookIds } });

    if (books.length !== items.length) {
      return res.status(404).json({ message: "One or more books not found" });
    }

    const orderItems = items.map((item) => {
      const book = books.find((b) => b._id.equals(item.bookId));
      return {
        book: book._id,
        quantity: item.quantity,
        priceSnapshot: book.price,
      };
    });

    const totalAmount = orderItems.reduce(
      (sum, i) => sum + i.quantity * i.priceSnapshot,
      0,
    );

    const order = new Order({
      customer: customer._id,
      items: orderItems,
      shippingAddress,
      totalAmount,
    });
    // TODO checkout session
    // *Find book inventory and update
    const inv = await Inventory.find({ book: { $in: bookIds } });

    const inventory = await Inventory.bulkWrite(
      items.map((item) => ({
        updateOne: {
          filter: { book: item.bookId },
          update: { $inc: { quantity: -item.quantity } },
        },
      })),
    );
    await order.save();
    res.status(201).json( order );
  } catch (error) {
    console.error("Error creating order", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
