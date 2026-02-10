import { Wishlist, Book } from "../../model/index.js";

export async function addToWishlistService(wishlist) {
  const { customer, books } = wishlist;
  const addToWishlist = await Wishlist.findOneAndUpdate(
    { customer: customer },
    {
      $addToSet: {
        books: {
          $each: books,
        },
      },
    },
    { upsert: true, new: true },
  );
  return addToWishlist;
}

export async function removeFromWishlistService(wishlist) {
  const { customer, book } = wishlist;
  console.log(book)
  const addToWishlist = await Wishlist.findOneAndUpdate(
    { customer: customer },
    {
      $pull: {
        books: book,
      },
    },
    { new: true },
  );
  return addToWishlist;
}
