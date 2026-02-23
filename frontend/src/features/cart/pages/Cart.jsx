import { useCart } from "@/features/cart/hooks/cart_hooks.js";
const Cart = () => {
  const { data: cart, isPending } = useCart();
  const items = cart?.items;
  console.log(cart);
  return (
    <div>
      {isPending
        ? "Loading..."
        : items?.map((item) => (
            <div key={item.book}>
              <label>Books: {item.book}</label>
              <span>Quantity: {item.quantity}</span>
              <span>Price: {item.priceSnapshot}</span>
            </div>
          ))}
    </div>
  );
};
export default Cart;
