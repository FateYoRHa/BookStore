import { Cart, Book, Customer } from "../../model/index.js";
import { addOrderService } from "./order_services.js";

export async function getCartService(user) {
  const customer = await Customer.findOne({ user: user.id }, { _id: 1 });
  return await Cart.findOne({ customer: customer });
}

export async function addToCartService(cart) {
  const { user, items } = cart;
  const customer = await Customer.findOne({ user: user }, { _id: 1 });
  let customerCart = await Cart.findOne({ customer: customer });
  if (!customerCart) {
    customerCart = await Cart.create({ customer, items: [] });
  }
  // find books
  const bookIds = items.map((i) => i.book);
  const books = await Book.find({ _id: { $in: bookIds } });
  if (!books) {
    const error = new Error("One or more books not found");
    error.status = 404;
    throw error;
  }
  const bookMap = new Map(books.map((book) => [book._id.toString(), book]));
  const cartItems = items.map((item) => {
    const book = bookMap.get(item.book.toString());

    if (!book) {
      throw new Error("Book not found");
    }

    return {
      book: book._id,
      quantity: item.quantity,
      priceSnapshot: book.price,
    };
  });
  for (const item of cartItems) {
    const existingItem = customerCart.items.find((i) =>
      i.book.equals(item.book),
    );
    if (existingItem) {
      existingItem.quantity = item.quantity;
      existingItem.priceSnapshot = item.priceSnapshot;
    } else {
      customerCart.items.push({
        book: item.book,
        quantity: item.quantity,
        priceSnapshot: item.priceSnapshot,
      });
    }
  }

  await customerCart.save();
  return customerCart;
}

export async function removeFromCartService(cart) {
  const { user, item } = cart;
  const customer = await Customer.findOne({ user: user });
  return await Cart.findOneAndUpdate(
    { customer: customer },
    { $pull: { items: { _id: item } } }, //remove from items where book = item
    { new: true },
  );
}

export async function checkoutService(id) {
  const customer = await Customer.findOne({ user: id }, { _id: 1, address: 1 });
  const customerId = customer.id;
  const address = customer.address;
  const orders = await addOrderService({ customerId, address });
  return orders;
}
