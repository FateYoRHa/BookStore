import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

const WishListSkeleton = () => {
  return (
    <Card className="w-full max-w-sm">
      <CardContent className="p-4 space-y-3">
        <Skeleton className="w-full h-[220px]" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </CardContent>
    </Card>
  );
};

export default WishListSkeleton;
