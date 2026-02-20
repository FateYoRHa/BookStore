import { useBooks } from "../hooks/book_hooks";
import { BookCard } from "./components/BookCard";
import BookSkeleton from "./components/BookSkeleton";
import toast from "react-hot-toast";
const Books = () => {
  const { data, isLoading, error } = useBooks();
  // console.log(data)
  // const books = data;
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
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 items-stretch">
            <BookSkeleton />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 items-stretch">
            {data?.map((book) => (
              <BookCard book={book} className="flex-1" key={book.bookCode} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Books;
