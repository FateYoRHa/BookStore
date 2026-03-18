import { Link } from "react-router-dom";
import { useGetWishlist } from "../hooks/wishlist_hooks";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import WishListSkeleton from "./components/WishListSkeleton";
import WishlistCard from "./components/WishlistCard";

const CustomerWishlist = () => {
  const { data: wishlist, isLoading } = useGetWishlist();

  const books = wishlist?.books || [];

  return (
    <div className="container max-w-7xl mx-auto px-4 py-8 space-y-10">
      {/* Header */}
      <section className="flex flex-col items-center text-center mx-auto px-4 py-5">
        <h1 className="text-2xl md:text-4xl font-bold tracking-tight">
          My Wishlist
        </h1>
        <p className="text-muted-foreground mt-2 text-sm md:text-base">
          Books you’ve saved for later
        </p>
      </section>

      {/* Grid */}
      {isLoading ? (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 justify-items-center">
          {Array.from({ length: 12 }).map((_, i) => (
            <WishListSkeleton key={i} />
          ))}
        </div>
      ) : books.length === 0 ? (
        <Card className="text-center py-20 space-y-4 col-span-full">
          <CardContent>
            <p className="text-muted-foreground">Your wishlist is empty.</p>
            <Button asChild>
              <Link to="/books">Browse Books</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 justify-items-center">
          {books.map((book) => (
            <WishlistCard key={book?.bookCode} book={book} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomerWishlist;
