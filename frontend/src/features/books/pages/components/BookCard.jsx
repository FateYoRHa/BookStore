import { cn } from "@/lib/utils";
import { useAddCart } from "@/features/cart/hooks/cart_hooks";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ShoppingBasket } from "lucide-react";

import { Link } from "react-router-dom";
export const BookCard = ({ book, className, ...props }) => {
  // * add to cart usecase
  const { mutate: addToCart, isPending } = useAddCart();

  const handleAdd = () => {
    addToCart({
      book: book?._id,
      quantity: 1,
    });
  };
  return (
    <Card
      className={cn(
        "flex flex-col h-full hover:shadow-lg transition-transform duration-300 hover:scale-105",
        className,
      )}
      {...props}>
      {/* 
      CardContent adds padding automatically
      p-4 ensures internal spacing
      */}
      {/* Book Title */}
      <Link to={`/books/${book.bookCode}`}>
        <CardTitle className="text-center">
          <h3 className="font-semibold">{book.title}</h3>
        </CardTitle>
        <CardContent className="p-4 flex flex-col gap-4 flex-grow">
          {/* Book Image Placeholder */}
          <AspectRatio className="overflow-hidden rounded-md">
            <img
              className="aspect-[3/4] w-full h-full object-cover"
              src={book.images[0].url}
              alt={book.title}
            />
          </AspectRatio>

          <p className="text-sm text-muted-foreground">
            by: {book.author.penName}
          </p>
          {/* Author */}
        </CardContent>
      </Link>
      <CardFooter className="flex justify-between items-center mt-auto">
        {/* 
          mt-auto pushes this section to bottom
          (because parent is flex column)
        */}

        {/* Price + Button Row */}
        <span className="font-bold">${book.price}</span>
        <Button size="xs" className="bg-green-500" onClick={handleAdd}>
          <ShoppingBasket /> {isPending ? "Adding" : "Add to Cart"}
        </Button>
      </CardFooter>
    </Card>
  );
};
