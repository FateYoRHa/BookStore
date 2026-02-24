import { useRemoveCart } from "../hooks/cart_hooks";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2 } from "lucide-react";
const CartItem = ({ item }) => {
  const { mutate: removeFromCart, isPending } = useRemoveCart();

  const handleClick = () => {
    removeFromCart({ item: item?.book._id });
  };
  return (
    <div className="flex flex-col sm:flex-row items-center gap-6 rounded-xl border p-4">

      {/* PRODUCT IMAGE */}
      <div className="h-24 w-20 shrink-0 overflow-hidden rounded-lg">

        <img
          src={item?.book.images?.[0]?.url}
          alt={item?.book.title}
          className="h-full w-full object-cover"
        />
      </div>

      {/* PRODUCT INFO */}
      <div className="flex-1 text-center sm:text-left">
        <Link to={`/books/${item?.book.bookCode}`}>
          <h3 className="font-medium text-base line-clamp-2">
            {item?.book.title}
          </h3>
        </Link>

        <p className="text-sm text-muted-foreground mt-1">
          ${item?.priceSnapshot}
        </p>
      </div>

      {/* QUANTITY CONTROLS */}
      <div className="flex items-center gap-2">
        <Button size="icon" variant="ghost">
          <Minus className="h-4 w-4" />
        </Button>

        <span className="min-w-[2rem] text-center font-medium">
          {item?.quantity}
        </span>

        <Button size="icon" variant="ghost">
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      {/* REMOVE BUTTON */}
      <Button
        variant="destructive"
        size="icon"
        onClick={handleClick}
        disabled={isPending}>
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default CartItem;
