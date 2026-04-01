import { Wishlist, Customer, Book } from "../../model/index.js";

export async function addToWishlistService(wishlist) {
  const { userId, book } = wishlist;
  const customer = await Customer.findOne({ user: userId }, { _id: 1 });
  const addToWishlist = await Wishlist.findOneAndUpdate(
    { customer: customer._id },
    {
      $addToSet: { books: book },
    },
    { upsert: true, new: true },
  );
  await Book.updateOne(
    { book: book },
    { $inc: { "analytics.wishlistCount": 1 } },
  );
  return addToWishlist;
}

export async function removeFromWishlistService(wishlist) {
  const { userId, book } = wishlist;
  const customer = await Customer.findOne({ user: userId }, { _id: 1 });
  const addToWishlist = await Wishlist.findOneAndUpdate(
    { customer: customer._id },
    {
      $pull: {
        books: book,
      },
    },
    { new: true },
  );
  await Book.updateOne(
    { bookCode: id },
    { $inc: { "analytics.viewCount": -1 } },
  );
  return addToWishlist;
}

export async function wishlistService(id) {
  const customer = await Customer.findOne({ user: id }, { _id: 1 });
  let wishlist = await Wishlist.findOne({ customer: customer._id }).populate({
    path: "books",
    populate: [{ path: "images" }, { path: "author", select: "penName" }],
  });
  if (!wishlist) {
    wishlist = await Wishlist.create({
      customer: customer._id,
      books: [],
    });
  }
  return wishlist;
}
