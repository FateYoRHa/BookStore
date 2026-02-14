import * as cartService from "../../services/commerce/cart_services.js";

export async function addToCart(req, res) {
  try {
    const { items } = req.body;
    const user = req.user.id;
    // const customer = req.params.id;
    const customerCart = await cartService.addToCartService({
      user,
      items,
    });
    res.status(200).json(customerCart);
  } catch (error) {
    console.log("Error adding to cart", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function removeFromCart(req, res) {
  try {
    const { item } = req.body;
    const user = req.user.id;

    const cart = await cartService.removeFromCartService({ user, item });
    res.status(200).json({ cart, message: "Book removed from cart" });
  } catch (error) {
    console.log("Error removing from cart", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

