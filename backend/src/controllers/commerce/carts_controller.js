import * as cartService from "../../services/commerce/cart_services.js";

export async function getCart(req, res) {
  try {
    // const customer = req.params.id;
    const customerCart = await cartService.getCartService({
      id: req.user.id,
    });
    res.status(200).json(customerCart);
  } catch (error) {
    console.log("Error getting cart", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function addToCart(req, res) {
  try {
    const items = req.body;
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
    const item = req.body;
    const user = req.user.id;

    const cart = await cartService.removeFromCartService({ user, item });
    res.status(200).json({ cart, message: "Book removed from cart" });
  } catch (error) {
    console.log("Error removing from cart", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function checkout(req, res) {
  try {
    const id = req.user.id;
    const orders = await cartService.checkoutService(id);
    res.status(200).json({ orders });
  } catch (error) {
    console.log("Error checkout", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
