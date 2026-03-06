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
  const book = await Book.findById(items.book, { _id: 1, price: 1 });
  if (!book) {
    const error = new Error("Book not found");
    error.status = 404;
    throw error;
  }
  const exists = customerCart.items.find((i) => i.book.equals(items.book));
  if (exists) {
    customerCart = await Cart.findOneAndUpdate(
      { customer: customer, "items.book": exists.book },
      {
        $set: {
          "items.$.quantity": items.quantity,
          "items.$.priceSnapshot": book.price,
        },
      },
      { new: true },
    );
  } else {
    customerCart = await Cart.findOneAndUpdate(
      { customer: customer },
      {
        $addToSet: {
          items: {
            book: items.book,
            quantity: items.quantity,
            priceSnapshot: book.price,
          },
        },
      },
      { new: true },
    );
  }

  return customerCart;
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

export async function clearCartService(user) {
  const customer = await Customer.findOne({ user: user });
  return await Cart.findOneAndUpdate(
    { customer: customer._id },
    { $set: { items: [] } }, // clear cart
    { new: true },
  );
}
export async function paymentService(checkout) {
  const { id, shippingFee, address, paymentMethod } = checkout;
  const customer = await Customer.findOne({ user: id }, { _id: 1, address: 1 });
  const customerId = customer.id;
  const { order, paymentIntentId, clientKey } = await addOrderService({
    customerId,
    address,
    shippingFee,
    paymentMethod,
  });
  return {
    orderId: order,
    paymentIntentId: paymentIntentId,
    clientKey: clientKey,
  };
}