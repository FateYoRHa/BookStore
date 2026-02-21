import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardFooter } from "@/components/ui/card.jsx";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Separator } from "@/components/ui/separator";
const BookDetailSkeleton = () => {
  return (
    <>
      {/* Main Card */}
      <Card className="grid grid-cols-1 md:grid-cols-[400px_1fr] gap-10">
        {/* LEFT: Book Image */}
        <CardContent>
          <AspectRatio ratio={3 / 4} className="rounded-md overflow-hidden">
            <Skeleton className="w-full h-full rounded-lg" />
          </AspectRatio>
        </CardContent>

        {/* RIGHT: Content */}
        <CardContent className="flex flex-col space-y-6">
          {/* Title */}
          <Skeleton className="h-8 w-3/4" />

          {/* Author */}
          <div className="flex items-center gap-4">
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-4 w-32" />
          </div>

          {/* Rating */}
          <Skeleton className="h-6 w-40" />

          {/* Description */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>

          {/* Meta Grid */}
          <div className="grid grid-cols-2 gap-y-2 gap-x-6">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-32" />
          </div>

          {/* Price + Button */}
          <CardFooter className="flex items-center justify-between gap-4 p-0">
            <Skeleton className="h-8 w-24" />
            <Skeleton className="h-10 w-40 rounded-xl" />
          </CardFooter>
        </CardContent>
      </Card>

      <Separator />

      {/* Reviews Section */}
      <Card className="space-y-6 mt-10">
        <CardContent>
          <Skeleton className="h-6 w-40 mb-6" />
          <Skeleton className="h-20 w-full rounded-md" />
          <Skeleton className="h-10 w-32 mt-5 ml-auto" />
        </CardContent>

        <CardContent className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="p-4 border border-gray-200 rounded-lg space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <Skeleton className="h-4 w-24" />
                </div>
                <Skeleton className="h-4 w-20" />
              </div>
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          ))}
        </CardContent>
      </Card>
    </>
  );
};

export default BookDetailSkeleton;
