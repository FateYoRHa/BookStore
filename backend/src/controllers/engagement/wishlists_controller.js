import * as wishlistService from "../../services/engagement/wishlist_services.js";

export async function addToWishlist(req, res) {
  try {
    const { customer, books } = req.body;

    const wishlist = await wishlistService.addToWishlistService({
      customer,
      books,
    });
    res.status(201).json(wishlist);
  } catch (error) {
    console.log("Error adding to wishlist", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function removeFromWishlist(req, res) {
  try {
    const { customer, book } = req.body;
    const wishlist = await wishlistService.removeFromWishlistService({
      customer,
      book,
    });
    res.status(200).json(wishlist);
  } catch (error) {
    console.log("Error removing from wishlist", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
