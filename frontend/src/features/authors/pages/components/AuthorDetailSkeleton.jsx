import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const AuthorDetailSkeleton = () => {
  return (
    <div className="container mx-auto px-6 py-10 max-w-6xl animate-pulse">
      {/* Author Profile Skeleton */}
      <Card className="mb-10">
        <CardContent className="flex flex-col md:flex-row items-center md:items-start gap-6 p-6">
          {/* Avatar */}
          <div className="h-32 w-32 rounded-full bg-accent" />

          {/* Author Info */}
          <div className="space-y-4 w-full">
            {/* Pen Name */}
            <div className="h-8 w-56 bg-accent rounded" />

            {/* Bio lines */}
            <div className="space-y-2">
              <div className="h-4 w-full bg-accent rounded" />
              <div className="h-4 w-[90%] bg-accent rounded" />
              <div className="h-4 w-[75%] bg-accent rounded" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Separator className="mb-10" />

      {/* Books Section */}
      <div className="space-y-6">
        {/* Section Title */}
        <div className="h-6 w-48 bg-muted rounded" />

        {/* Books Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {Array.from({ length: 8 }).map((_, i) => (
            <Card key={i}>
              <CardContent className="p-4 space-y-4">
                {/* Book cover */}
                <div className="aspect-[3/4] w-full bg-accent rounded-md" />

                {/* Book title */}
                <div className="h-4 w-3/4 bg-accent rounded" />

                {/* Author text */}
                <div className="h-3 w-1/2 bg-accent rounded" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AuthorDetailSkeleton;
