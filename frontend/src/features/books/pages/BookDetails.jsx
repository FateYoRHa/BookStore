import { useParams, useNavigate } from "react-router-dom";
import { useRef } from "react";
import { useBook } from "../hooks/book_hooks.js";
import { useAddCart } from "@/features/cart/hooks/cart_hooks.js";
import {
  usePostReview,
  usePutReview,
} from "@/features/reviews/hooks/review_hooks.js";

import { Card, CardContent, CardFooter } from "@/components/ui/card.jsx";
import { Button } from "@/components/ui/button.jsx";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Rating } from "@/components/rating";
import { ShoppingCart } from "lucide-react";
import { Separator } from "@/components/ui/separator.jsx";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import BookDetailSkeleton from "./components/BookDetailSkeleton.jsx";
import ReviewForm from "@/features/reviews/pages/ReviewForm.jsx";
import ReviewList from "@/features/reviews/pages/ReviewList.jsx";
import UpdateReviewForm from "@/features/reviews/pages/UpdateReviewForm.jsx";

import { useAuthStore } from "@/features/auth/store/authStore.js";
import { useRequireLogin } from "@/components/utils/requireLogin.js";
const BookDetails = () => {
  const { id } = useParams();
  const { data: book, isLoading, error } = useBook(id);
  const { mutate: addToCart, isPending } = useAddCart();
  const { mutate: postReview } = usePostReview(book?._id);
  const { mutate: putReview } = usePutReview(book?._id);
  const requireLogin = useRequireLogin();
  const customer = useAuthStore((state) => state.customer);
  const inventory = book?.inventory;
  const plugin = useRef(Autoplay({ delay: 5000, stopOnInteraction: true }));
  const reviews = book?.reviews;
  const ratings = reviews?.map((review) => review.rating);
  const rating = ratings?.reduce((a, b) => a + b, 0) / ratings?.length;
  const handleReviewSubmit = (reviewData) => {
    if (!requireLogin()) return;
    postReview(reviewData);
  };
  const handleUpdateReviewSubmit = (reviewData) => {
    if (!requireLogin()) return;
    putReview(reviewData);
  };

  const handleAdd = () => {
    if (!requireLogin()) return;
    addToCart({
      book: book?._id,
      quantity: 1,
    });
  };
  let hasReview = false;
  let reviewId = null;

  if (customer) {
    reviews?.map((review) => {
      if (review?.customer?._id === customer.customer._id) {
        reviewId = review?._id;
        hasReview = true;
      }
    });
  }
  if (error) return <p>Error loading book.</p>;
  return (
    <main className="container relative max-w-7xl mx-auto px-6 py-16 md:py-24">
      {isLoading ? (
        <BookDetailSkeleton />
      ) : (
        <div>
          <Card className="grid grid-cols-1 md:grid-cols-[400px_1fr] gap-10">
            <CardContent>
              <Carousel
                plugins={[plugin.current]}
                onMouseEnter={plugin.current.stop}
                onMouseLeave={plugin.current.reset}>
                <CarouselContent>
                  {book?.images.map((image, i) => (
                    <CarouselItem key={i}>
                      <AspectRatio
                        ratio={3 / 4}
                        className="overflow-hidden rounded-md">
                        <img
                          className="w-full h-full object-cover rounded-lg shadow-xl"
                          src={image?.url || image?.image?.url}
                          alt={image?.altText || image?.image?.altText}
                        />
                      </AspectRatio>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </CardContent>
            <CardContent className="flex flex-col space-y-6">
              <section className="text-3xl">
                <h2 className="font-semibold font-serif">{book?.title}</h2>
              </section>
              {/* AUTHOR SECTION */}
              <section className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                    className="grayscale"
                  />
                </Avatar>
                <span className="font-semibold">{book?.author.penName}</span>
              </section>
              {/* RATING SECTION */}
              <section className="flex items-center gap-4">
                <Rating
                  rate={rating}
                  showScore
                  description={`from ${ratings?.length}+ reviews`}
                  className="fill-yellow-400"
                />
              </section>
              {/* DESCRIPTION */}
              <section className="flex items-center gap-4">
                <p className="max-w-2xl text-muted-foreground font-sans">
                  {book?.description}
                </p>
              </section>
              {/* META DATA GRID */}
              <section className="grid grid-cols-2 gap-y-2 gap-x-6 text-sm">
                <label className="font-semibold text-black">Categories:</label>
                <span className="text-muted-foreground">
                  {book?.categories.map((cat) => `${cat?.name}, `)}
                </span>
                <label className="font-semibold text-black">Publisher: </label>
                <span className="text-muted-foreground">{book?.publisher}</span>
                <label className="font-semibold text-black">ISBN:</label>
                <span className="text-muted-foreground">{book?.bookCode}</span>
                <label className="font-semibold text-black">Language:</label>
                <span className="text-muted-foreground">{book?.language}</span>
                <label className="font-semibold text-black">Pages:</label>
                <span className="text-muted-foreground">{book?.pages}</span>
                <label className="font-semibold text-black">Stock: </label>
                <span className="text-muted-foreground">
                  {inventory?.status === "out-of-stock"
                    ? inventory?.status
                    : inventory?.quantity}
                </span>
              </section>
              {/* Price + CTA Buttons */}
              <CardFooter className="flex items-center justify-between gap-4">
                <span className="text-2xl font-bold text-teal-800">
                  ${book?.price}
                </span>
                <div className="gap-2 inline-flex">
                  <Button
                    onClick={handleAdd}
                    className="px-6 py-2 rounded-xl bg-teal-800 text-white hover:bg-teal-700 transition">
                    <ShoppingCart />
                    {isPending ? "Adding to Card..." : "Add to Cart"}
                  </Button>
                </div>
                {/* px-6 py-2 → padding inside button
            rounded-xl → smooth rounded corners
            bg-teal-800 → primary color
            hover:bg-teal-700 → hover effect
            transition → smooth hover transition */}
              </CardFooter>
            </CardContent>
          </Card>
          <Separator />
          {/* Reviews Section */}
          <Card className="space-y-6 mt-10">
            {/* WRITE REVIEW */}
            {hasReview ? (
              <UpdateReviewForm
                id={reviewId}
                onSubmitReview={handleUpdateReviewSubmit}
                hasReview={hasReview}
              />
            ) : (
              <ReviewForm
                book={book?._id}
                onSubmitReview={handleReviewSubmit}
                hasReview={hasReview}
              />
            )}
            <ReviewList reviews={reviews} />
          </Card>
        </div>
      )}
    </main>
  );
};
export default BookDetails;
