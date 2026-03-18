import * as wishlistService from "../../services/engagement/wishlist_services.js";

export async function addToWishlist(req, res) {
  try {
    const { book } = req.body;
    const userId = req.user.id;

    const wishlist = await wishlistService.addToWishlistService({
      userId,
      book,
    });
    res.status(201).json(wishlist);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function removeFromWishlist(req, res) {
  try {
    const userId = req.user.id;
    const { book } = req.body;
    const wishlist = await wishlistService.removeFromWishlistService({
      userId,
      book,
    });
    res.status(200).json(wishlist);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function wishlist(req, res) {
  try {
    const userId = req.user.id;
    const wishlist = await wishlistService.wishlistService(userId);

    res.status(200).json(wishlist);
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ message: error.message || "Internal Server Error" });
  }
}
