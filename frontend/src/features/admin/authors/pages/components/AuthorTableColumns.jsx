import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { ListPlus, Pencil, Trash } from "lucide-react";
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
    cell: ({ row }) => {
      const author = row.original;

      return (
        <div className="flex items-start gap-3 max-w-[300px]">
          {/* IMAGE */}
          <img
            src={author?.image?.url}
            alt={author?.penName}
            className="h-10 w-10 rounded-md object-cover border shrink-0"
          />
          {/* Title wraps naturally */}
          <span className="font-medium leading-snug break-words whitespace-normal">
            {author?.penName}
          </span>
        </div>
      );
    },
  },
  {
    header: "Bio",
    accessorKey: "bio",
    meta: { className: "text-center" },
    cell: ({ getValue }) => (
      <span className="text-muted-foreground text-center block break-words">
        {getValue()}
      </span>
    ),
  },
  {
    id: "actions",
    header: "Actions",
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
              onClick={() => onReAdd(author.authorCode)}>
              <ListPlus className="h-4 w-4 text-success" />
            </Button>
          ) : (
            <Button
              size="icon"
              variant="ghost"
              onClick={() => onDelete(author.authorCode)}
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
