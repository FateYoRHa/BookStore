import { useState } from "react";
import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useGetAuthors } from "../hooks/author_hooks";

import AuthorCard from "./components/AuthorCard";
import AuthorSkeleton from "./components/AuthorSkeleton";

const Authors = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const { data, isLoading } = useGetAuthors({
    page,
    search,
    limit: 12,
  });

  const authors = data?.authors || [];
  const totalPages = data?.totalPages || 1;

  return (
    <div className="container mx-auto px-6 py-10">
      {/* Header */}
      <section className="container flex flex-col items-center text-center mx-auto px-4 py-5">
        <h1 className="text-2xl md:text-4xl font-bold tracking-tight">
          Discover Your Next Favorite Author
        </h1>
      </section>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
        <h1 className="text-3xl font-bold"></h1>

        {/* Search */}
        <div className="relative w-full md:w-[320px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

          <Input
            placeholder="Search author..."
            value={search}
            onChange={(e) => {
              setPage(1); // reset to first page
              setSearch(e.target.value);
            }}
            className="pl-9"
          />
        </div>
      </div>

      {/* Authors Grid */}
      {isLoading ? (
        <div className="flex justify-center">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-6xl">
            {Array.from({ length: 12 }).map((_, i) => (
              <AuthorSkeleton key={i} />
            ))}
          </div>
        </div>
      ) : (
        <>
          {authors.length === 0 ? (
            <p className="text-center text-muted-foreground">
              No authors found.
            </p>
          ) : (
            <div className="flex justify-center">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-6xl">
                {authors.map((author) => (
                  <AuthorCard key={author._id} author={author} />
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {/* Pagination */}
      <div className="flex justify-center items-center gap-4 mt-10">
        <Button
          variant="outline"
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}>
          Previous
        </Button>

        <span className="text-sm text-muted-foreground">
          Page {page} of {totalPages}
        </span>

        <Button
          variant="outline"
          disabled={page === totalPages}
          onClick={() => setPage((prev) => prev + 1)}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default Authors;
