import { useState } from "react";
import { useGetAdminBooks } from "../hooks/admin_books_hooks";
import EditBook from "./components/EditBook";
import AddBook from "./components/AddBook";
import AddFeaturedDialog from "../../featured/pages/components/AddFeaturedDialog";
import { Button } from "@/components/ui/button";
import { BookPlus } from "lucide-react";
import {
  useRemoveAdminBook,
  useReAddAdminBook,
} from "../hooks/admin_books_hooks";
import { BooksColumns } from "./components/BookTableColumns";
import DataTable from "../../components/DataTable";
import { toast } from "sonner";
const AdminBooks = () => {
  const { data } = useGetAdminBooks();
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openFeatured, setOpenFeatured] = useState(false);

  const [editBook, setEditBook] = useState(null);
  const [featureBook, setFeatureBook] = useState(null);
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
  const onFeatured = (book) => {
    setFeatureBook(book);
    setOpenFeatured(true);
  };
  const columns = BooksColumns({
    onEdit,
    onDelete,
    onReAdd,
    isDeleting,
    isReAdding,
    onFeatured,
  });
  return (
    <div className="flex min-h-0 flex-1 flex-col min-w-0 overflow-hidden p-4">
      <Button onClick={onAdd} className="self-end mb-4">
        <BookPlus className="h-4 w-4" />
        Add Book
      </Button>
      {/* Table container fills available space */}
      <DataTable data={data} columns={columns} />

      {/* Edit dialog */}
      <EditBook book={editBook} open={openEdit} setOpen={setOpenEdit} />

      {/* Add dialog */}
      <AddBook open={open} setOpen={setOpen} />

      {/* Add Featured Dialog */}
      <AddFeaturedDialog
        featured={featureBook}
        open={openFeatured}
        setOpen={setOpenFeatured}
        itemType="Book"
      />
    </div>
  );
};

export default AdminBooks;
