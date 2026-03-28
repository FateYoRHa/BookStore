import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";

const OrdersTableColumns = () => [
  // Order Code
  {
    header: "Order Code",
    accessorKey: "orderCode",
    meta: { className: "w-[90px] text-center" },
    cell: ({ getValue }) => (
      <span className="font-mono text-xs block text-center">{getValue()}</span>
    ),
  },

  // Customer
  {
    header: "Customer",
    accessorKey: "customer",
    meta: { className: "w-[150px] text-center" },
    cell: ({ row }) => {
      const { customerCode, name } = row.original.customer;
      return (
        <div className="flex flex-col items-center text-sm">
          <span className="font-mono text-xs text-muted-foreground">
            {customerCode}
          </span>
          <span className="font-medium break-words">{name}</span>
        </div>
      );
    },
  },

  // Items
  {
    header: "Items",
    accessorKey: "items",
    meta: { className: "w-[280px]" },
    cell: ({ row }) => {
      const items = row.original.items;
      const visibleItems = items.slice(0, 2);
      const remaining = items.length - 2;

      return (
        <div className="space-y-1">
          {visibleItems.map((item, i) => (
            <div key={i} className="flex gap-2 text-xs items-center">
              <img
                src={item.book?.images?.[0]?.image?.url}
                alt={item.book?.title}
                className="w-8 h-8 rounded object-cover"
              />
              <div className="flex flex-col flex-1">
                <span className="font-medium break-words">
                  {item.book?.title}
                </span>
                <div className="flex justify-between text-muted-foreground text-xs">
                  <span>₱{item.book?.price.toFixed(2)}</span>
                  <span>x{item.quantity}</span>
                  <span className="font-medium text-foreground">
                    ₱{(item.book?.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          ))}
          {remaining > 0 && (
            <span className="text-xs text-muted-foreground">
              +{remaining} more items
            </span>
          )}
        </div>
      );
    },
  },

  // Shipping Address
  {
    header: "Shipping Address",
    accessorKey: "shippingAddress",
    meta: { className: "w-[180px] text-center" },
    cell: ({ row }) => {
      const { street, city, zipCode, postalCode, country } =
        row.original.shippingAddress;
      return (
        <div className="text-xs leading-tight break-words text-center">
          {street}, {city}, {postalCode || zipCode}, {country}
        </div>
      );
    },
  },

  // Status
  {
    header: "Status",
    accessorKey: "status",
    meta: { className: "w-[90px] text-center" },
    cell: ({ getValue }) => {
      const status = getValue();
      const variantMap = {
        pending: "secondary",
        processing: "default",
        shipped: "outline",
        delivered: "success",
        cancelled: "destructive",
      };
      return (
        <Badge variant={variantMap[status] || "secondary"}>{status}</Badge>
      );
    },
  },

  // Payment
  {
    header: "Payment",
    accessorKey: "payment.method",
    meta: { className: "w-[70px] text-center" },
    cell: ({ getValue }) => (
      <span className="text-xs font-medium uppercase text-center">
        {getValue()}
      </span>
    ),
  },

  // Actions (centered dropdown)
  {
    header: "Actions",
    id: "actions",
    meta: { className: "w-[60px] text-center" },
    cell: ({ row }) => {
      const order = row.original;
      return (
        <div className="flex justify-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" variant="ghost">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center">
              <DropdownMenuItem>View</DropdownMenuItem>
              <DropdownMenuItem>Update</DropdownMenuItem>
              <DropdownMenuItem className="text-red-500">
                Cancel
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
export default OrdersTableColumns;
