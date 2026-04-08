import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ListPlus, Pencil, Trash, BadgePlus, MoreHorizontal } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Spinner } from "@/components/ui/spinner";
const CategoryTableColumns = ({
  onEdit,
  onRemove,
  onReAdd,
  isRemoving,
  isReAdding,
  onFeatured,
}) => [
  {
    accessorKey: "categoryCode",
    header: "Category Code",
    meta: { className: "text-center" },
    cell: ({ getValue }) => (
      <span className="font-mono block text-center">{getValue()}</span>
    ),
  },
  {
    id: "category",
    header: "Category",
    cell: ({ row }) => {
      const category = row.original;
      return (
        <div className="flex items-center gap-3 max-w-[250px] mx-auto">
          <img
            src={category?.image?.url}
            alt={category?.name}
            className="h-10 w-10 rounded-md object-cover border shrink-0"
          />

          <span className="font-medium break-words whitespace-normal text-left">
            {category?.name}
          </span>
        </div>
      );
    },
  },
  {
    header: "Description",
    accessorKey: "description",
    meta: { className: "text-center" },
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
    header: "Status",
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
      const category = row.original;

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
                onClick={() => onEdit(category)}
                className="flex items-center gap-2">
                <Pencil className="h-4 w-4" />
                Edit
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => onFeatured(category)}
                className="flex items-center gap-2">
                <BadgePlus className="h-4 w-4" />
                Feature
              </DropdownMenuItem>

              {category.deletedAt ? (
                <DropdownMenuItem
                  onClick={() => onReAdd(category.categoryCode)}
                  disabled={isReAdding}
                  className="flex items-center gap-2">
                  <ListPlus className="h-4 w-4 text-success" />
                  Re-add
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem
                  onClick={() => onRemove(category.categoryCode)}
                  disabled={isRemoving}
                  className="flex items-center gap-2">
                  {isRemoving ? (
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

export default CategoryTableColumns;
