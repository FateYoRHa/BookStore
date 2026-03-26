import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ShoppingCart, Trash2 } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAddCart } from "@/features/cart/hooks/cart_hooks";
import { useRemoveFromWishlist } from "../../hooks/wishlist_hooks";
import { useQueryClient } from "@tanstack/react-query";

const WishlistCard = ({ book }) => {
  const { mutateAsync: addToCart, isPending } = useAddCart();
  const { mutateAsync: removeBook, isPending: isRemoving } =
    useRemoveFromWishlist();
  const queryClient = useQueryClient();
  const handleAdd = async () => {
    if (isPending || isRemoving) return;
    // instantly remove from UI
    queryClient.setQueryData(["wishlist"], (old) => {
      if (!old?.books) return old;
      return { ...old, books: old.books.filter((b) => b._id !== book._id) };
    });

    try {
      await addToCart({
        book: book._id,
        quantity: 1,
      });
      await removeBook({ book: book._id });
    } catch (err) {
      // rollback if needed
      queryClient.invalidateQueries(["wishlist"]);
    }
  };
  const handleRemove = async () => {
    await removeBook({ book: book?._id });
  };
  return (
    <Card
      key={book._id}
      className="flex flex-col cursor-pointer hover:shadow-lg hover:-translate-y-1 hover:scale-105 transition w-full duration-300">
      <Link to={`/books/${book.bookCode}`}>
        <CardHeader className="pb-2">
          <CardTitle className="text-base line-clamp-2 text-center">
            <span>{book.title}</span>
          </CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col gap-3 grow">
          <AspectRatio ratio={3 / 4} className="overflow-hidden rounded-md">
            <img
              src={book.images?.[0]?.url || book.images?.[0]?.image?.url}
              alt={book.title}
              className="w-full h-full object-cover"
            />
          </AspectRatio>

          <p className="text-sm text-muted-foreground text-center line-clamp-1">
            by {book.author?.penName}
          </p>

          <p className="font-semibold text-sm text-center">${book.price}</p>
        </CardContent>
      </Link>

      <CardFooter className="flex flex-col gap-2 mt-auto">
        <Button size="sm" className="w-full" onClick={handleAdd}>
          {isPending ? (
            "Adding..."
          ) : (
            <>
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add to Cart
            </>
          )}
        </Button>

        <Button
          size="sm"
          variant="destructive"
          className="w-full"
          onClick={handleRemove}>
          {isRemoving ? (
            "Removing..."
          ) : (
            <>
              <Trash2 className="mr-2 h-4 w-4" />
              Remove
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default WishlistCard;
