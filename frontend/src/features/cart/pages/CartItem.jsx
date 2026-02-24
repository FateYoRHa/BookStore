import { useRemoveCart } from "../hooks/cart_hooks";

import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Minus, Plus, Trash2 } from "lucide-react";
const CartItem = ({ item }) => {
  const { mutate: removeFromCart, isPending } = useRemoveCart();

  const handleClick = () => {
    removeFromCart({ item: item?.book._id });
  };
  return (
    <div className="bg-cart-item border-cart-border flex items-center gap-4 rounded-lg border p-4">
      {/* Product Image */}
      <div className="bg-muted flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-lg">
        <img
          src={item?.book.images?.[0].url}
          alt={item?.book.title}
          className="h-full w-full rounded-lg object-cover"
        />
      </div>

      {/* Product Details */}
      <div className="min-w-0 flex-1">
        <Link to={`/books/${item?.book.bookCode}`}>
          <h3 className="text-black line-clamp-2 text-sm font-medium lg:text-base">
            {item?.book.title}
          </h3>
        </Link>
      </div>

      {/* Quantity Controls */}
      <div className="bg-cart-quantity flex items-center gap-2 rounded-lg p-1">
        <Button variant="ghost" size="icon" className="hover:bg-muted h-8 w-8">
          <Minus className="h-4 w-4" />
        </Button>
        <span className="min-w-[2rem] text-center text-sm font-medium">
          {item?.quantity}
        </span>
        <Button variant="ghost" size="icon" className="hover:bg-muted h-8 w-8">
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      {/* Price */}
      <div className="text-cart-price min-w-[80px] text-right text-sm font-semibold lg:text-base">
        {item?.priceSnapshot}
      </div>

      {/* Remove Button */}
      <Button
        variant="destructive"
        size="icon"
        className="text-muted-foreground hover:text-amber-50 hover:bg-red-800 h-8 w-8"
        onClick={handleClick}
        disabled={isPending}>
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default CartItem;
