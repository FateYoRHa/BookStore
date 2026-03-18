import { Wishlist, Customer } from "../../model/index.js";

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
