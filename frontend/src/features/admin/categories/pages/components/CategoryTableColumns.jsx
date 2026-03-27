import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ListPlus, Pencil, Trash } from "lucide-react";

const CategoryTableColumns = () => [
  {
    accessorKey: "catCode",
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
            src={category?.icon}
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
        <div className="flex justify-center gap-2">
          <Button size="icon" variant="ghost">
            <Pencil className="h-4 w-4" />
          </Button>

          {category.deletedAt ? (
            <Button size="icon" variant="ghost">
              <ListPlus className="h-4 w-4 text-green-500" />
            </Button>
          ) : (
            <Button size="icon" variant="ghost">
              <Trash className="h-4 w-4 text-destructive" />
            </Button>
          )}
        </div>
      );
    },
  },
];

export default CategoryTableColumns;
