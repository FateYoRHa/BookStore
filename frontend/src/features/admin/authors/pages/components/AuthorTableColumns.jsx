import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Spinner } from "@/components/ui/spinner";
import { ArrowUpDown, ListPlus, Pencil, Trash } from "lucide-react";

const AuthorTableColumns = ({
  onEdit,
  onDelete,
  onReAdd,
  isDeleting,
  isReAdding,
}) => [
  {
    header: "Author Code",
    accessorKey: "authorCode",
    meta: { className: "text-center" },
    cell: ({ getValue }) => (
      <span className="font-mono block text-center">{getValue()}</span>
    ),
  },

  {
    header: "Author",
    id: "author",
    meta: { className: "text-center" },
    size: 250,
    cell: ({ row }) => {
      const author = row.original;

      return (
        <div className="flex items-center gap-3 max-w-[250px] mx-auto">
          <img
            src={author?.image?.url}
            alt={author?.penName}
            className="h-10 w-10 rounded-md object-cover border shrink-0"
          />

          <span className="font-medium break-words whitespace-normal text-left">
            {author?.penName}
          </span>
        </div>
      );
    },
  },

  {
    header: "Bio",
    accessorKey: "bio",
    size: 300,
    cell: ({ getValue }) => (
      <div className="max-w-[300px] mx-auto text-center">
        <span className="text-muted-foreground break-words whitespace-normal leading-snug">
          {getValue()}
        </span>
      </div>
    ),
  },

  {
    accessorKey: "deletedAt",
    size: 100,
    meta: { className: "text-center" },

    header: ({ column }) => (
      <div className="flex items-center justify-center gap-1">
        Status
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          <ArrowUpDown className="h-4 w-4" />
        </button>
      </div>
    ),

    sortingFn: (rowA, rowB) => {
      const a = rowA.original.deletedAt ? 1 : 0;
      const b = rowB.original.deletedAt ? 1 : 0;
      return a - b;
    },

    cell: ({ getValue }) => {
      const deletedAt = getValue();

      return (
        <div className="flex justify-center">
          <Badge variant={deletedAt ? "destructive" : "success"}>
            {deletedAt ? "Removed" : "Active"}
          </Badge>
        </div>
      );
    },
  },

  {
    id: "actions",
    header: "Actions",
    size: 100,
    meta: {
      className: "text-center sticky right-0 bg-background z-20 border-l",
    },

    cell: ({ row }) => {
      const author = row.original;

      return (
        <div className="flex justify-center gap-2">
          <Button size="icon" variant="ghost" onClick={() => onEdit(author)}>
            <Pencil className="h-4 w-4" />
          </Button>

          {author.deletedAt ? (
            <Button
              size="icon"
              variant="ghost"
              disabled={isReAdding}
              onClick={() => onReAdd(author._id)}>
              {isReAdding ? (
                <Spinner className="h-4 w-4" />
              ) : (
                <ListPlus className="h-4 w-4 text-green-500" />
              )}
            </Button>
          ) : (
            <Button
              size="icon"
              variant="ghost"
              onClick={() => onDelete(author._id)}
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

export default AuthorTableColumns;
