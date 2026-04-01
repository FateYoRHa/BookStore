import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import {
  BadgePlus,
  ListPlus,
  MoreHorizontal,
  Pencil,
  Trash,
} from "lucide-react";
import { ArrowUpDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
export const BooksColumns = ({
  onEdit,
  onDelete,
  onReAdd,
  isDeleting,
  isReAdding,
  onFeatured,
}) => [
  {
    id: "book",
    header: "Book",
    size: 250,
    maxSize: 300,
    cell: ({ row }) => {
      const book = row.original;
      const imageUrl = book?.images?.[0]?.url || book?.images?.[0]?.image?.url;
      return (
        <div className="flex items-start gap-3 max-w-[300px]">
          <img
            src={imageUrl}
            alt={book?.title}
            className="h-10 w-10 rounded-md object-cover border shrink-0"
          />
          <div className="flex flex-col min-w-0">
            {/* Title wraps naturally */}
            <span className="font-medium leading-snug break-words whitespace-normal">
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
    cell: ({ getValue }) => (
      <span className="font-medium leading-snug break-words whitespace-normal">
        {getValue()}
      </span>
    ),
  },
  {
    accessorKey: "publisher",
    header: "Publisher",
    size: 120,
    meta: { className: "hidden md:table-cell" }, //hidden on mobile visible, on md / lg screens
    cell: ({ getValue }) => (
      <span className="font-medium leading-snug break-words whitespace-normal">
        {getValue()}
      </span>
    ),
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
      const [expanded, setExpanded] = useState(false);
      const categories = getValue() ?? [];

      const max = 4;
      const visible = expanded ? categories : categories.slice(0, max);
      const remaining = categories.length - max;

      return (
        <div className="flex flex-wrap gap-1">
          {visible.map((c) => (
            <Badge key={c._id} className="w-fit whitespace-nowrap">
              {c.name}
            </Badge>
          ))}

          {!expanded && remaining > 0 && (
            <Badge
              variant="outline"
              className="cursor-pointer"
              onClick={() => setExpanded(true)}>
              +{remaining} more
            </Badge>
          )}

          {expanded && categories.length > max && (
            <Badge
              variant="outline"
              className="cursor-pointer"
              onClick={() => setExpanded(false)}>
              Show less
            </Badge>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "deletedAt",
    header: ({ column }) => (
      <button
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center gap-1">
        Status
        <ArrowUpDown className="h-4 w-4" />
      </button>
    ),
    size: 80,
    sortingFn: (rowA, rowB) => {
      const a = rowA.original.deletedAt ? 1 : 0;
      const b = rowB.original.deletedAt ? 1 : 0;
      return a - b;
    },
    cell: ({ getValue }) => {
      const deletedAt = getValue();
      return (
        <Badge variant={deletedAt ? "destructive" : "success"}>
          {deletedAt ? "Removed" : "Active"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "inventory.quantity",
    header: ({ column }) => (
      <button
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center gap-1">
        Stock
        <ArrowUpDown className="h-4 w-4" />
      </button>
    ),
    minSize: 50,
    size: 80,
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
    minSize: 50,
    size: 80,
    cell: ({ getValue }) => `₱${getValue()?.toLocaleString()}`,
  },
  {
    id: "actions",
    header: "Actions",
    minSize: 50,
    size: 80,
    meta: {
      className:
        "sticky right-0 bg-background z-20 shadow-[-4px_0_6px_-2px_rgba(0,0,0,0.1)]",
    },
    cell: ({ row }) => {
      const book = row.original;
      return (
        <div className="flex justify-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" variant="ghost">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="center" className="w-40">
              <DropdownMenuItem
                onClick={() => onEdit(book)}
                className="flex items-center gap-2">
                <Pencil className="h-4 w-4" />
                Edit
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => onFeatured(book)}
                className="flex items-center gap-2">
                <BadgePlus className="h-4 w-4" />
                Feature
              </DropdownMenuItem>

              {book.deletedAt ? (
                <DropdownMenuItem
                  onClick={() => onReAdd(book.bookCode)}
                  disabled={isReAdding}
                  className="flex items-center gap-2">
                  <ListPlus className="h-4 w-4 text-success" />
                  Re-add
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem
                  onClick={() => onDelete(book.bookCode)}
                  disabled={isDeleting}
                  className="flex items-center gap-2">
                  {isDeleting ? (
                    <Spinner className="h-4 w-4" />
                  ) : (
                    <>
                      <Trash className="h-4 w-4 text-destructive" />
                      Remove
                    </>
                  )}
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
