import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

const BookSkeleton = () => {
  return (
    <Card className="w-full">
      {/* Title */}
      <Skeleton className="h-4 w-3/4" />
      <CardContent className="space-y-4">
        {/* Book Image Placeholder */}
        <AspectRatio ratio={3 / 4}>
          <Skeleton className="w-full h-full rounded-md" />
        </AspectRatio>

        {/* Author */}
        <Skeleton className="h-4 w-1/2" />
      </CardContent>

      <CardFooter className="flex justify-between items-center">
        <Skeleton className="h-4 w-12" />
        <Skeleton className="h-8 w-20 rounded-md" />
      </CardFooter>
    </Card>
  );
};

export default BookSkeleton;
