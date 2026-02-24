import { useCart } from "@/features/cart/hooks/cart_hooks.js";

import CartItem from "./CartItem";
const Cart = () => {
  const { data: cart, isPending } = useCart();
  const items = cart?.items;
  return (
    <div>
      {isPending
        ? "Loading..."
        : items?.map((item) => (
          <CartItem key={item?.book.bookCode} item={item} />
          ))}
    </div>
  );
};
export default Cart;
