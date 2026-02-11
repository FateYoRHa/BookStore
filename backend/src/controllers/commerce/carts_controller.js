import * as cartService from "../../services/commerce/cart_services.js";

export async function addToCart(req, res) {
  try {
    const { customer, items } = req.body;
    // const customer = req.params.id;
    const customerCart = await cartService.addToCartService({
      customer,
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
    const { customer, item } = req.body
    const cart = await cartService.removeFromCartService({ customer, item });
    res.status(200).json({cart,message:"Book removed from wishlist"});
  } catch (error) {
    console.log("Error adding to cart", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
