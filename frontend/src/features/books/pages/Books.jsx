import { useSearchParams } from "react-router-dom";
import { useMemo, useEffect } from "react";
import { useBooks } from "../hooks/book_hooks";
import { BookCard } from "./components/BookCard";
import BookFilterBar from "./BookFilterBar";

import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
const Books = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters = useMemo(() => {
    return {
      ...Object.fromEntries(searchParams.entries()),
      page: Number(searchParams.get("page")) || 1,
    };
  }, [searchParams]);

  const { data, isLoading, error } = useBooks(filters);
  // console.log(data?.totalPages)
  const updateParam = (key, value) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      if (key !== "page") {
        params.set("page", "1");
      }
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }

      // Reset page when filter changes
      if (key !== "page") {
        params.set("page", "1");
      }

      return params;
    });
  };
  // console.log(data)
  // const books = data;
  useEffect(() => {
    if (error) {
      if (error.response) {
        // Server responded with error
        toast.error(error.response.data?.message || "Request failed");
      } else if (error.request) {
        // Request made but no response
        toast.error("Server not responding");
      } else {
        // Something else
        toast.error("Unexpected error occurred");
      }
    }
  }, [error]);
  return (
    <div className="container">
      {/* ================= Header SECTION ================= */}
      <section className="container flex flex-col items-center text-center mx-auto px-4 py-5">
        <h1 className="text-2xl md:text-4xl font-bold tracking-tight">
          Discover Your Next Favorite Book
        </h1>
      </section>
      {/* ================= BOOKS SECTION ================= */}
      <section className="container mx-auto px-4 py-12">
        {/* 
          grid → CSS Grid layout
          grid-cols-1 → 1 column on mobile
          sm:grid-cols-2 → 2 columns on small screens
          md:grid-cols-3 → 3 columns on medium screens
          lg:grid-cols-4 → 4 columns on large screens
          gap-6 → spacing between cards
        */}
        {/* Individual Book Card */}
        {/* // FILTERTS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-2">
          {/* FILTER SIDEBAR */}
          <aside className="md:col-span-1">
            <BookFilterBar />
          </aside>

          {/* BOOKS GRID */}
          <main className="md:col-span-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 items-stretch">
              {data?.books?.map((book) => (
                <BookCard
                  book={book}
                  className="flex-1"
                  key={book.bookCode}
                  isLoading={isLoading}
                />
              ))}
            </div>
          </main>
        </div>
      </section>
      <div className="flex justify-center items-center gap-2 mt-6 flex-wrap">
        <Button
          variant="outline"
          disabled={filters.page === 1}
          onClick={() => updateParam("page", filters.page - 1)}>
          Previous
        </Button>
        <span className="text-sm font-medium">
          Page {data?.page} of {data?.totalPages}
        </span>
        {Array.from({ length: data?.totalPages }, (_, i) => i + 1).map(
          (pageNum) => (
            <Button
              key={pageNum}
              variant={filters.page === pageNum ? "default" : "outline"}
              onClick={() => updateParam("page", pageNum)}>
              {pageNum}
            </Button>
          ),
        )}
        <Button
          variant="outline"
          disabled={filters.page === data?.totalPages}
          onClick={() => updateParam("page", filters.page + 1)}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default Books;
