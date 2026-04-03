import { Button } from "@/components/ui/button";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Eye, MoreHorizontal } from "lucide-react";
import { DropdownMenu } from "radix-ui";
import { Link } from "react-router-dom";

const FeaturedTableColumns = () => [
  {
    id: "item",
    header: "Featured Item",
    cell: ({ row }) => {
      const item = row.original;
      return (
        <div className="flex items-center gap-3 max-w-[250px] mx-auto">
          <span className="font-medium break-words whitespace-normal text-left">
            {item?.penName || item?.name || item?.title}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "itemType",
    header: "Featured Type",
    cell: ({ getValue }) => (
      <div className="flex items-center gap-3 max-w-[250px] mx-auto">
        <span className="font-medium text-center">{getValue()}</span>
      </div>
    ),
  },
  {
    accessorKey: "section",
    header: "Section",
    cell: ({ getValue }) => (
      <div className="flex items-center gap-3 max-w-[250px] mx-auto">
        <span className="font-medium text-center capitalize">{getValue()}</span>
      </div>
    ),
  },
  {
    id: "duration",
    header: "Duration",
    cell: ({ row }) => {
      const item = row.original;
      const startDate = new Date(item?.startDate).toLocaleDateString();
      const endDate = new Date(item?.endDate).toLocaleDateString();
      return (
        <div className="flex items-center gap-3 max-w-[250px] mx-auto">
          <span className="font-medium text-center">{`${startDate} to ${endDate}`}</span>
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    meta: { className: "w-[60px] text-center" },
    cell: ({ row }) => {
      const item = row.original;
      return (
        <div className="flex justify-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" variant="ghost">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center">
              <DropdownMenuItem>
                <Link to={``} className="inline-flex items-center gap-2">
                  <Eye /> View Featured
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="inline-flex">
                <Link to={``} className="inline-flex items-center gap-2">
                  <Pen /> Update Featured
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-500">End</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];

export default FeaturedTableColumns;
