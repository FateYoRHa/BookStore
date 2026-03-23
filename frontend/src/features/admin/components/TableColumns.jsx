import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { ListPlus, Pencil, Trash } from "lucide-react";
export const BooksColumns = ({
  onEdit,
  onDelete,
  onReAdd,
  isDeleting,
  isReAdding,
}) => [
  {
    id: "book",
    header: "Book",
    size: 250, // optional: you can adjust min width
    cell: ({ row }) => {
      const book = row.original;
      const imageUrl =
        book?.images?.[0]?.url ??
        "https://via.placeholder.com/150x200?text=No+Image";
      return (
        <div className="flex items-start gap-3 min-w-0">
          <img
            src={imageUrl}
            alt={book?.title}
            className="h-10 w-10 rounded-md object-cover border shrink-0"
          />
          <div className="flex flex-col min-w-0">
            {/* Title wraps naturally */}
            <span className="font-medium break-words leading-snug">
              {book?.title}
            </span>

            {/* Book code */}
            <span className="font-mono opacity-70">{book?.bookCode}</span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "author.penName",
    header: "Author",
    size: 150,
  },
  {
    accessorKey: "publisher",
    header: "Publisher",
    meta: { className: "hidden md:table-cell" }, //hidden on mobile visible, on md / lg screens
  },
  {
    accessorKey: "publicationDate",
    header: "Publication Date",
    meta: { className: "hidden lg:table-cell" }, //hidden on mobile visible, on md / lg screens
    cell: ({ getValue }) => new Date(getValue()).toLocaleDateString(),
  },
  {
    accessorKey: "categories",
    header: "Categories",
    size: 200,
    cell: ({ getValue }) => {
      const categories = getValue() ?? [];

      return (
        <div className="flex flex-wrap gap-1">
          {categories.map((c) => (
            <Badge key={c._id}>{c.name}</Badge>
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: "deletedAt",
    header: "Status",
    cell: ({ getValue }) => {
      const deletedAt = getValue();
      const variant = deletedAt ? "destructive" : "success";
      return (
        <Badge variant={variant}>{deletedAt ? "Removed" : "Active"}</Badge>
      );
    },
  },
  {
    accessorKey: "inventory.quantity",
    header: "Stock",
    cell: ({ getValue }) => (
      <Badge
        variant={
          getValue() === 0
            ? "destructive"
            : getValue() < 10
              ? "warning"
              : "default"
        }>
        {/* fallback to 0 if inventory is missing */}
        {getValue() ?? 0}
      </Badge>
    ),
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ getValue }) => `₱${getValue()?.toLocaleString()}`,
  },
  {
    id: "actions",
    header: "Actions",
    meta: {
      className:
        "sticky right-0 bg-background z-20 shadow-[-4px_0_6px_-2px_rgba(0,0,0,0.1)]",
    },
    cell: ({ row }) => {
      const book = row.original;
      return (
        <div className="flex justify-end gap-2">
          <Button
            size="icon"
            variant="ghost"
            /* Pass selected book to parent handler, Parent decides what to do (open modal, navigate, etc.) */
            onClick={() => onEdit(book)}>
            <Pencil className="h-4 w-4" />
          </Button>
          {book.deletedAt ? (
            <Button
              size="icon"
              variant="ghost"
              disabled={isReAdding}
              onClick={() => onReAdd(book.bookCode)}>
              <ListPlus className="h-4 w-4 text-success" />
            </Button>
          ) : (
            <Button
              size="icon"
              variant="ghost"
              onClick={() => onDelete(book.bookCode)}
              disabled={isDeleting}>
              {isDeleting ? (
                <Spinner className="h-4 w-4" />
              ) : (
                <Trash className="h-4 w-4 text-destructive" />
              )}
            </Button>
          )}
        </div>
      );
    },
  },
];
