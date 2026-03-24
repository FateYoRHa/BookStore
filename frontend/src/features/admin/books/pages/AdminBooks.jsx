import { useState } from "react";
import BooksTable from "./components/BooksTable";
import { useGetAdminBooks } from "../hooks/admin_books_hooks";
import EditBook from "./components/EditBook";
import AddBook from "./components/AddBook";
import { Button } from "@/components/ui/button";
import { BookPlus } from "lucide-react";
import {
  useRemoveAdminBook,
  useReAddAdminBook,
} from "../hooks/admin_books_hooks";
import { BooksColumns } from "./components/BookTableColumns";
import { toast } from "sonner";
const AdminBooks = () => {
  const { data } = useGetAdminBooks();
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [editBook, setEditBook] = useState(null);
  const { mutate: removeBook, isPending: isDeleting } = useRemoveAdminBook();
  const { mutate: reAddMutate, isPending: isReAdding } = useReAddAdminBook();

  const onEdit = (book) => {
    setEditBook(book);
    setOpenEdit(true);
  };
  const onAdd = () => {
    setEditBook(null);
    setOpen(true);
  };

  const onDelete = (book) => {
    removeBook(book, {
      onSuccess: () => {
        toast.success("Book removed successfully.");
      },
    });
  };

  const onReAdd = (book) => {
    reAddMutate(book, {
      onSuccess: () => {
        toast.success("Book re-added successfully.");
      },
    });
  };
  const columns = BooksColumns({
    onEdit,
    onDelete,
    onReAdd,
    isDeleting,
    isReAdding,
  });
  return (
    // TODO remove page scroll
    <div className="flex flex-col flex-1 p-4 overflow-auto min-w-0">
      <Button onClick={onAdd} className="self-end mb-4">
        <BookPlus className="h-4 w-4" />
        Add Book
      </Button>
      {/* Table container fills available space */}
      <BooksTable
        books={data}
        columns={columns}
        onEdit={onEdit}
        onDelete={onDelete}
        onReAdd={onReAdd}
        isReAdding={isReAdding}
        isDeleting={isDeleting}
      />

      {/* Edit dialog */}
      <EditBook book={editBook} open={openEdit} setOpen={setOpenEdit} />

      {/* Add dialog */}
      <AddBook open={open} setOpen={setOpen} />
    </div>
  );
};

export default AdminBooks;
