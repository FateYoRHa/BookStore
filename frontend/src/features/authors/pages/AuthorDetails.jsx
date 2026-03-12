import { useParams } from "react-router-dom";
import { useGetAuthor } from "../hooks/author_hooks";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { BookCard } from "@/features/books/pages/components/BookCard";
import AuthorDetailSkeleton from "./components/AuthorDetailSkeleton";
const AuthorDetails = () => {
  const { id } = useParams();
  const { data: author, isLoading } = useGetAuthor(id);
  const books = author?.books;
  return (
    <div className="container">
      {isLoading ? (
        <AuthorDetailSkeleton />
      ) : (
        <div className="mx-auto px-6 py-10 max-w-6xl">
          {/* Author Profile */}
          <Card className="mb-10">
            <CardContent className="flex flex-col md:flex-row items-center md:items-start gap-6 p-6">
              {/* Author Image */}
              <Avatar className="h-32 w-32">
                <AvatarImage
                  src={author?.image?.url}
                  alt={author?.image?.alt}
                />
                <AvatarFallback>
                  {author?.penName?.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>

              {/* Author Info */}
              <div className="space-y-4 text-center md:text-left">
                <h1 className="text-3xl font-bold">{author?.penName}</h1>

                <p className="text-muted-foreground leading-relaxed max-w-3xl">
                  {author?.bio}
                </p>
              </div>
            </CardContent>
          </Card>

          <Separator className="mb-10" />

          {/* Books Section */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">
              Books by {author?.penName}
            </h2>

            {books?.length === 0 ? (
              <p className="text-muted-foreground">
                No books found for this author.
              </p>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {author?.books?.map((book) => (
                  <BookCard
                    book={book}
                    className="flex-1"
                    key={book?.bookCode}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthorDetails;
