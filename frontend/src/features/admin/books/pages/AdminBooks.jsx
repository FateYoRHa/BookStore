import { useState } from "react";
import BooksTable from "./components/BooksTable";
import { useGetAdminBooks } from "../hooks/admin_books_hooks";
import EditBook from "./components/EditBook";

const AdminBooks = () => {
  const { data } = useGetAdminBooks();
  const [open, setOpen] = useState(false);
  const [editBook, setEditBook] = useState(null);

  const onEdit = (book) => {
    setEditBook(book);
    setOpen(true);
  };

  const onDelete = (book) => {
    console.log("Delete", book);
  };

  return (
    // TODO remove page scroll
    <div className="flex flex-col flex-1 p-4 overflow-hidden">
      {/* Table container fills available space */}
      <BooksTable books={data} onEdit={onEdit} onDelete={onDelete} />

      {/* Edit dialog */}
      <EditBook book={editBook} open={open} setOpen={setOpen} />
    </div>
  );
};

export default AdminBooks;
