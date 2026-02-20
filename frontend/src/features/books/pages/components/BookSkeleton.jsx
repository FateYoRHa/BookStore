import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
const BookSkeleton = () => {
  return (
    <Card
      className=
        "flex flex-col h-full hover:shadow-lg transition-shadow">
      {/* Book Title */}
      <CardTitle>
        <Skeleton className="h-4 w-2/3 mx-auto" />
      </CardTitle>
      <CardContent>
        {/* Book Image Placeholder */}
        <AspectRatio>
          <Skeleton className="aspect-video w-full h-full" />
        </AspectRatio>

        <Skeleton className="h-4 w-1/2 mt-5" />
        {/* Author */}
      </CardContent>
      <CardFooter className="flex justify-between items-center mt-auto">
        {/* Price + Button Row */}
        <Skeleton className="h-4 w-12" />
        <Skeleton className="h-8 w-16 sm" />
      </CardFooter>
    </Card>
  );
};

export default BookSkeleton;
