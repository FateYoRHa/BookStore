import { useState } from "react";
import BooksTable from "./components/BooksTable";
import { useGetAdminBooks } from "../hooks/admin_books_hooks";
import EditBook from "./components/EditBook";
import AddBook from "./components/AddBook";
import { Button } from "@/components/ui/button";
import { BookPlus } from "lucide-react";
import useRemoveAdminBook from "../hooks/admin_books_hooks";
import { on } from "node:cluster";
import { toast } from "sonner";
const AdminBooks = () => {
  const { data } = useGetAdminBooks();
  const [open, setOpen] = useState(false);
  const [editBook, setEditBook] = useState(null);
  const { mutate, isPending: isDeleting } = useRemoveAdminBook();

  const onEdit = (book) => {
    setEditBook(book);
    setOpen(true);
  };
  const onAdd = () => {
    setEditBook(null);
    setOpen(true);
  };

  const onDelete = (book) => {
    mutate(book, {
      onSuccess: () => {
        toast.success("Book removed successfully.");
      },
    });
  };

  return (
    // TODO remove page scroll
    <div className="flex flex-col flex-1 p-4 overflow-hidden">
      <Button onClick={onAdd} className="self-end mb-4">
        <BookPlus className="h-4 w-4" />
        Add Book
      </Button>
      {/* Table container fills available space */}
      <BooksTable books={data} onEdit={onEdit} onDelete={onDelete} isDeleting={isDeleting} />

      {/* Edit dialog */}
      <EditBook book={editBook} open={open} setOpen={setOpen} />

      {/* Add dialog */}
      <AddBook open={open} setOpen={setOpen} />
    </div>
  );
};

export default AdminBooks;
