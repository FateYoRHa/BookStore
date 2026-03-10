import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { AspectRatio } from "@/components/ui/aspect-ratio";

export default function CategorySkeleton() {
  return (
    <Card className="w-full">
      <CardContent className="p-4 flex flex-col items-center space-y-2">
        {/* Image Skeleton */}
        <div className="w-full">
          <AspectRatio ratio={1 / 1}>
            <Skeleton className="h-full w-full rounded-md" />
          </AspectRatio>
        </div>

        {/* Category Name */}
        <Skeleton className="h-5 w-24" />

        {/* Description */}
        <Skeleton className="h-4 w-32" />
      </CardContent>
    </Card>
  );
}
