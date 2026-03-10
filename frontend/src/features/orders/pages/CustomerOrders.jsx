import { useAuthStore } from "@/features/auth/store/authStore";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TableHeader,
  TableCaption,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { useGetCustomerOrders } from "../hooks/orders_hook";

const CustomerOrders = () => {
  const customer = useAuthStore((state) => state.customer).customer;
  const { data: orders, isLoading } = useGetCustomerOrders();
  const [expanded, setExpanded] = useState({});
  const toggleExpand = (orderCode) => {
    setExpanded((prev) => ({
      ...prev,
      [orderCode]: !prev[orderCode],
    }));
  };
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <Card className="p-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[160px] px-4">Order</TableHead>
              <TableHead className="w-[140px] px-4">Status</TableHead>
              <TableHead className="w-full px-4">Items</TableHead>
              <TableHead className="w-[140px]">Method</TableHead>
              <TableHead className="w-[140px] text-right px-4">Total</TableHead>
              <TableHead className="w-[70px]" />
            </TableRow>
          </TableHeader>

          <TableBody>
            {orders?.map((order) => {
              const previewItems = order.items.slice(0, 2);
              const remaining = order.items.length - 2;
              const isExpanded = expanded[order.orderCode];

              const itemsToRender = isExpanded ? order.items : previewItems;

              return (
                <TableRow key={order.orderCode} className="align-top">
                  {/* Order Code */}
                  <TableCell className="px-4 py-4 font-medium">
                    {order.orderCode}
                  </TableCell>

                  {/* Status */}
                  <TableCell className="px-4 py-4 capitalize">
                    {order.status}
                  </TableCell>

                  {/* Items */}
                  <TableCell className="px-4 py-4">
                    <div className="flex flex-col gap-3">
                      {itemsToRender.map((item) => (
                        <div
                          key={item.book._id}
                          className="flex items-center gap-3">
                          {/* Image */}
                          <div className="h-14 w-10 overflow-hidden rounded border bg-muted">
                            <img
                              src={item.book.images?.[0]?.url}
                              alt={item.book.title}
                              className="h-full w-full object-cover"
                            />
                          </div>

                          {/* Title */}
                          <div className="flex flex-col">
                            <span className="text-sm font-medium leading-tight">
                              {item.book.title}
                            </span>

                            <span className="text-xs text-muted-foreground">
                              Qty: {item.quantity}
                            </span>
                          </div>
                        </div>
                      ))}

                      {/* "+X more items" indicator */}
                      {!isExpanded && remaining > 0 && (
                        <span className="text-sm text-muted-foreground">
                          +{remaining} more item{remaining > 1 ? "s" : ""}
                        </span>
                      )}
                    </div>
                  </TableCell>

                  {/* Method */}
                  <TableCell className="px-4 py-4 capitalize">
                    {order?.payment?.method}
                  </TableCell>
                  {/* Total */}
                  <TableCell className="px-4 py-4 text-right font-semibold">
                    ₱{order.totalAmount?.toLocaleString()}
                  </TableCell>

                  {/* Expand Button */}
                  <TableCell>
                    {order.items.length > 2 && (
                      <button
                        onClick={() => toggleExpand(order.orderCode)}
                        className="text-muted-foreground hover:text-foreground">
                        {isExpanded ? (
                          <ChevronUp size={18} />
                        ) : (
                          <ChevronDown size={18} />
                        )}
                      </button>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default CustomerOrders;
