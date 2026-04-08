import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const ViewFeaturedItemSkeleton = () => {
  return (
    <main className="container max-w-7xl mx-auto px-6 py-16 md:py-24">
      <Card className="grid grid-cols-1 md:grid-cols-[400px_1fr] gap-10">
        {/* LEFT: IMAGE CAROUSEL */}
        <CardContent>
          <div className="space-y-4">
            <Skeleton className="w-full h-[500px] rounded-md" />
            <div className="flex gap-2">
              <Skeleton className="w-16 h-20 rounded-md" />
              <Skeleton className="w-16 h-20 rounded-md" />
              <Skeleton className="w-16 h-20 rounded-md" />
            </div>
          </div>
        </CardContent>

        {/* RIGHT: DETAILS */}
        <CardContent className="space-y-6">
          {/* TITLE */}
          <Skeleton className="h-8 w-3/4" />

          {/* AVATAR + SUBTITLE */}
          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-4 w-32" />
          </div>

          {/* RATING */}
          <Skeleton className="h-5 w-40" />

          {/* DESCRIPTION */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/6" />
          </div>

          {/* META GRID */}
          <div className="grid grid-cols-2 gap-y-2 gap-x-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="contents">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-32" />
              </div>
            ))}
          </div>

          {/* PRICE / ACTION */}
          <div className="flex items-center justify-between">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-10 w-28 rounded-md" />
          </div>
        </CardContent>
      </Card>

      {/* FEATURED DETAILS */}
      <section className="mt-10">
        <Card>
          <CardContent className="space-y-6 p-6">
            <Skeleton className="h-6 w-40" />

            <div className="grid grid-cols-2 gap-y-2 gap-x-6">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-32" />

              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-32" />
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  );
};

export default ViewFeaturedItemSkeleton;
