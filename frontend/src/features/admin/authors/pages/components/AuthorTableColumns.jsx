import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Spinner } from "@/components/ui/spinner";
import {
  ArrowUpDown,
  ListPlus,
  Pencil,
  Trash,
  BadgePlus,
  MoreHorizontal,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
const AuthorTableColumns = ({
  onEdit,
  onDelete,
  onReAdd,
  isDeleting,
  isReAdding,
  onFeatured,
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
        <div className="flex justify-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" variant="ghost">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="center" className="w-40">
              <DropdownMenuItem
                onClick={() => onEdit(author)}
                className="flex items-center gap-2">
                <Pencil className="h-4 w-4" />
                Edit
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => onFeatured(author)}
                className="flex items-center gap-2">
                <BadgePlus className="h-4 w-4" />
                Feature
              </DropdownMenuItem>

              {author.deletedAt ? (
                <DropdownMenuItem
                  onClick={() => onReAdd(author.authorCode)}
                  disabled={isReAdding}
                  className="flex items-center gap-2">
                  <ListPlus className="h-4 w-4 text-success" />
                  Re-add
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem
                  onClick={() => onDelete(author.authorCode)}
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

export default AuthorTableColumns;
