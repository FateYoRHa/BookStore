import { useParams } from "react-router-dom";
import { useBook } from "../hooks/book_hooks.js";

const BookPage = () => {
  const { id } = useParams();
  const { data: book, isLoading, error } = useBook(id);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading book.</p>;

  return (
    <div>
      <h1>{book?.title}</h1>
      <img src={book?.images?.[0]?.url} alt={book?.title} />
      <p>{book?.description}</p>
    </div>
  );
};
export default BookPage;
