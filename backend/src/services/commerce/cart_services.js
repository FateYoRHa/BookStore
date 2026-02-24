import { Cart, Book, Customer } from "../../model/index.js";
import { addOrderService } from "./order_services.js";

export async function getCartService(user) {
  const customer = await Customer.findOne({ user: user.id }, { _id: 1 });
  return await Cart.findOne({ customer: customer }).populate({
    path: "items.book",
    select: "bookCode title price",
    populate: [
      { path: "images", match: { type: "cover" } },
      { path: "inventory", select: "quantity" },
    ],
  });
}

export async function addToCartService(cart) {
  const { user, items } = cart;
  const customer = await Customer.findOne({ user: user }, { _id: 1 });
  let customerCart = await Cart.findOne({ customer: customer });
  if (!customerCart) {
    customerCart = await Cart.create({ customer, items: [] });
  }
  // find book
  const book = await Book.findById(items.book);
  if (!book) {
    const error = new Error("Book not found");
    error.status = 404;
    throw error;
  }
  const existingItem = customerCart.items.find((i) =>
    i.book.equals(items.book),
  );
  if (existingItem) {
    existingItem.quantity = items.quantity;
    existingItem.priceSnapshot = book.price * items.quantity;
  } else {
    customerCart.items.push({
      book: items.book,
      quantity: items.quantity,
      priceSnapshot: book.price * items.quantity,
    });
  }

  await customerCart.save();
  return customerCart;
  // }
}
export async function removeFromCartService(cart) {
  const { user, item } = cart;
  const customer = await Customer.findOne({ user: user });
  return await Cart.findOneAndUpdate(
    { customer: customer._id },
    { $pull: { items: { book: item } } }, //remove from items where book = item
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
