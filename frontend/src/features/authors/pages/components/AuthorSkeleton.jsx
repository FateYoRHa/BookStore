import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";

/*
AuthorSkeleton

- Matches AuthorCard layout
- Uses Tailwind "animate-pulse" for skeleton effect
- Keeps cards uniform during loading
*/

const AuthorSkeleton = () => {
  return (
    <Card className="animate-pulse">
      {/* Skeleton Avatar */}
      <CardHeader className="flex justify-center pb-2">
        <div className="h-24 w-24 rounded-full bg-gray-300" />
      </CardHeader>

      {/* Skeleton Content */}
      <CardContent className="space-y-2">
        {/* Pen name placeholder */}
        <div className="h-5 w-24 mx-auto rounded bg-gray-300"></div>

        {/* Bio placeholder */}
        <div className="space-y-1">
          <div className="h-3 w-32 mx-auto rounded bg-gray-300"></div>
          <div className="h-3 w-28 mx-auto rounded bg-gray-300"></div>
          <div className="h-3 w-24 mx-auto rounded bg-gray-300"></div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AuthorSkeleton;
