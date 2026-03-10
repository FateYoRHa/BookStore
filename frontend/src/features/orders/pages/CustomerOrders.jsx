import { useAuthStore } from "@/features/auth/store/authStore";
import { useState } from "react";
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
import { Skeleton } from "@/components/ui/skeleton";

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
      {isLoading ? (
        <Card className="p-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[160px] px-4">Order</TableHead>
                <TableHead className="w-[140px] px-4">Status</TableHead>
                <TableHead className="w-full px-4">Items</TableHead>
                <TableHead className="w-[140px]">Method</TableHead>
                <TableHead className="w-[140px] text-right px-4">
                  Total
                </TableHead>
                <TableHead className="w-[70px]" />
              </TableRow>
            </TableHeader>

            <TableBody>
              {Array.from({ length: 4 }).map((_, i) => (
                <TableRow key={i} className="align-top">
                  {/* Order */}
                  <TableCell className="px-4 py-4">
                    <Skeleton className="h-4 w-24" />
                  </TableCell>

                  {/* Status */}
                  <TableCell className="px-4 py-4">
                    <Skeleton className="h-4 w-20" />
                  </TableCell>

                  {/* Items */}
                  <TableCell className="px-4 py-4">
                    <div className="flex flex-col gap-3">
                      {/* Item 1 */}
                      <div className="flex items-center gap-3">
                        <Skeleton className="h-14 w-10 rounded-md" />

                        <div className="flex flex-col gap-1">
                          <Skeleton className="h-4 w-[200px]" />
                          <Skeleton className="h-3 w-[60px]" />
                        </div>
                      </div>

                      {/* Item 2 */}
                      <div className="flex items-center gap-3">
                        <Skeleton className="h-14 w-10 rounded-md" />

                        <div className="flex flex-col gap-1">
                          <Skeleton className="h-4 w-[180px]" />
                          <Skeleton className="h-3 w-[50px]" />
                        </div>
                      </div>

                      {/* more items indicator */}
                      <Skeleton className="h-3 w-24" />
                    </div>
                  </TableCell>

                  {/* Payment Method */}
                  <TableCell className="px-4 py-4">
                    <Skeleton className="h-4 w-16" />
                  </TableCell>

                  {/* Total */}
                  <TableCell className="px-4 py-4 text-right">
                    <Skeleton className="h-4 w-20 ml-auto" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      ) : (
        <Card className="p-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[160px] px-4">Order</TableHead>
                <TableHead className="w-[140px] px-4">Status</TableHead>
                <TableHead className="w-full px-4">Items</TableHead>
                <TableHead className="w-[140px]">Method</TableHead>
                <TableHead className="w-[140px] text-right px-4">
                  Total
                </TableHead>
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

                        {order.items.length > 2 && (
                          <button
                            onClick={() => toggleExpand(order.orderCode)}
                            className="flex">
                            {!isExpanded && remaining > 0 ? (
                              <span className="text-sm text-muted-foreground">
                                +{remaining} more item{remaining > 1 ? "s" : ""}
                              </span>
                            ) : (
                              <span className="text-sm text-muted-foreground">
                                collapse
                              </span>
                            )}
                          </button>
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
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Card>
      )}
    </div>
  );
};

export default CustomerOrders;
