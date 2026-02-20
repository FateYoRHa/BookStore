import { cn } from "@/lib/utils";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ShoppingBasket } from "lucide-react";
import BookSkeleton from "./BookSkeleton";

import { Link } from "react-router-dom";
export const BookCard = ({ book, className, isLoading, ...props }) => {
  return (
    // TODO onhover bookimages will carousel
    <div>
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 items-stretch">
          <BookSkeleton />
        </div>
      ) : (
        <Link to={`/books/${book.bookCode}`}>
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
            <CardFooter className="flex justify-between items-center mt-auto">
              {/* 
          mt-auto pushes this section to bottom
          (because parent is flex column)
        */}

              {/* Price + Button Row */}
              <span className="font-bold">${book.price}</span>
              <Button size="xs" className="bg-green-500">
                <ShoppingBasket /> Add to Cart
              </Button>
            </CardFooter>
          </Card>
        </Link>
      )}
    </div>
  );
};
