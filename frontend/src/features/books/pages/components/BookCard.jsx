import { cn } from "@/lib/utils";
import { useAddCart } from "@/features/cart/hooks/cart_hooks";
import { useAddWishlist } from "@/features/wishlist/hooks/wishlist_hooks";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ShoppingBasket, BookPlus } from "lucide-react";
import { useRequireLogin } from "@/components/utils/requireLogin";

import { Link } from "react-router-dom";
export const BookCard = ({ book, className, ...props }) => {
  // * add to cart usecase
  const { mutate: addToCart, isPending } = useAddCart();
  const { mutate: addToWishlist, isAdding } = useAddWishlist();
  const requireLogin = useRequireLogin();

  const handleAdd = () => {
    if (!requireLogin()) return;
    addToCart({
      book: book?._id,
      quantity: 1,
    });
  };
  const handleWishlist = () => {
    if (!requireLogin()) return;
    addToWishlist({
      book: book?._id,
    });
  };
  return (
    <Card
      className={cn(
        "flex flex-col h-full hover:shadow-lg transition-transform duration-300 hover:scale-105",
        className,
      )}
      {...props}>
      {/* Clickable book area */}
      <Link to={`/books/${book.bookCode}`}>
        <CardTitle className="text-center">
          <h3 className="font-semibold">{book.title}</h3>
        </CardTitle>

        <CardContent className="p-4 flex flex-col gap-3 flex-grow">
          {/* Book Image */}
          <AspectRatio className="overflow-hidden rounded-md">
            <img
              className="aspect-[3/4] w-full h-full object-cover"
              src={book.images[0].url}
              alt={book.title}
            />
          </AspectRatio>

          {/* Author */}
          <p className="text-sm text-muted-foreground">
            by: {book.author.penName}
          </p>

          {/* Price under author */}
          <span className="font-bold">${book.price}</span>
        </CardContent>
      </Link>

      {/* Buttons section */}
      <CardFooter className="flex flex-col gap-2 mt-auto">
        <Button size="xs" className="bg-green-500 w-full" onClick={handleAdd}>
          <ShoppingBasket /> {isPending ? "Adding" : "Add to Cart"}
        </Button>

        <Button
          size="xs"
          className="bg-neutral-500 w-full"
          onClick={handleWishlist}>
          <BookPlus /> Add to Wishlist
        </Button>
      </CardFooter>
    </Card>
  );
};
