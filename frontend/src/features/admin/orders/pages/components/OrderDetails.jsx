import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, Truck, Package, Clipboard, Package2 } from "lucide-react";
import { useGetAdminOrderDetail } from "../../hooks/admin_order_hooks";
import { useParams } from "react-router-dom";

const OrderDetails = () => {
  const { id } = useParams();
  const { data: order, isPending } = useGetAdminOrderDetail(id);

  // ORDER STATUS TRACKER stuff
  const isCancelled = order?.status === "cancelled";
  const steps = [
    { key: "pending", label: "Pending", icon: CheckCircle },
    { key: "paid", label: "Preparing", icon: Package2 },
    { key: "shipped", label: "Shipped", icon: Truck },
    {
      key: "out_for_delivery",
      label: "Out for Delivery",
      icon: Package,
      completed: false,
    },
    { key: "delivered", label: "Delivered", icon: Clipboard },
  ];
  const currentIndex = steps.findIndex((s) => s.key === order?.status);
  const progress = () => {
    const index = steps.findIndex((s) => s.key === order?.status);
    if (index === -1 || order?.status === "cancelled") return 0;
    // progress is based on step completion (e.g., step 1 of 4 => 25%)
    return ((index + 1) / steps.length) * 100;
  };
  // FORMATTERS
  const formatDate = (dateString) => {
    if (!dateString) return;
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "2-digit",
      hour: "numeric",
      minute: "numeric",
      hour12: true, // Optional: use 12-hour clock
    }).format(date);
  };
  const formatPhone = (phoneNumber) => {
    if (!phoneNumber) return;
    // Remove all non-numeric characters
    const cleaned = ("" + phoneNumber).replace(/\D/g, "");
    let match = null;
    cleaned.length == 11
      ? (match = cleaned.match(/^(\d{3})(\d{4})(\d{4})$/))
      : (match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/));

    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return null;
  };
  // ---------------------------------------
  const customer = order?.customer;
  const address = order?.shippingAddress;
  return (
    <div className="p-6 space-y-6 overflow-auto">
      {/* Top Section */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Order Info */}
        <Card>
          <CardHeader>
            <CardTitle>Order ORD-12345</CardTitle>
            <p className="text-sm text-muted-foreground">
              Placed on {formatDate(order?.createdAt)}
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="font-semibold">Customer Information</p>
              <p className="text-sm text-muted-foreground">{customer?.name}</p>
              <p className="text-sm text-muted-foreground">
                +{formatPhone(customer?.phone)}
              </p>
              <p className="text-sm text-muted-foreground">
                {address?.street}, {address?.city}, {address?.zipCode},
                {address?.country}
              </p>
            </div>

            <Card className="p-4 flex justify-between">
              <div>
                <p className="font-medium">Payment Method</p>
                <p className="text-sm text-muted-foreground uppercase">
                  {order?.payment?.method}
                </p>
                {order?.payment?.transactionId ? (
                  <>
                    <p className="font-medium">Transaction Id</p>
                    <p className="text-sm text-muted-foreground">
                      {order?.payment?.transactionId}
                    </p>
                  </>
                ) : (
                  <>
                    <p className="font-medium">Order Id</p>
                    <p className="text-sm text-muted-foreground">
                      {order?._id}
                    </p>
                  </>
                )}
                <p className="font-medium">Payment Status</p>

                {order?.payment?.status === "pending" ? (
                  <p className="text-sm text-muted-foreground uppercase">
                    {order?.payment?.status}
                  </p>
                ) : (
                  <p className="text-sm text-muted-foreground uppercase">
                    {order?.payment?.status} on{" "}
                    {formatDate(order?.payment?.updatedAt)}
                  </p>
                )}
              </div>
            </Card>
          </CardContent>
        </Card>

        {/* Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₱{order?.totalAmount?.toFixed(2)}</span>
            </div>
            <Separator />
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>₱{order?.totalAmount?.toFixed(2)}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Delivery Status */}
      <Card>
        <CardHeader>
          <CardTitle>Delivery Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const completed = !isCancelled && index <= currentIndex;

              return (
                <div
                  key={step.key}
                  className="flex flex-col items-center flex-1">
                  <div
                    className={`rounded-full p-3 ${
                      isCancelled
                        ? "bg-red-500 text-white"
                        : completed
                          ? "success"
                          : "bg-muted"
                    }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <p className="text-sm mt-2">{step.label}</p>
                </div>
              );
            })}
          </div>

          {/* Progress bar */}
          <div className="h-2 bg-muted rounded-full mt-4 overflow-hidden">
            <div
              className="h-full bg-black transition-all"
              style={{ width: `${progress()}%` }}
            />
          </div>

          <div className="mt-3">
            {order?.status == "paid" ? (
              <span className="text-sm text-muted-foreground ml-2">
                Preparing your order.
              </span>
            ) : order?.status === "cancelled" ? (
              <>
                <Badge variant="destructive">Cancelled</Badge>
                <span className="text-sm text-muted-foreground ml-2">
                  on {formatDate(order?.updatedAt)}
                </span>
              </>
            ) : (
              <>
                <Badge>Shipped</Badge>
                <span className="text-sm text-muted-foreground ml-2">
                  on {formatDate(order?.updatedAt)}
                </span>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Order Items */}
      <Card>
        <CardHeader>
          <CardTitle>Order Items</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {order?.items?.map((item) => (
            <div
              key={item?._id}
              className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center gap-4">
                <img
                  src={item.book?.images?.[0]?.image?.url}
                  alt={item.book?.title}
                  className="w-12 h-12 bg-muted rounded"
                />
                <p>{item.book?.title}</p>
              </div>

              <div className="flex gap-10 text-sm">
                <span>{item?.quantity}</span>
                <span>₱{item?.priceSnapshot?.toFixed(2)}</span>
                <span>
                  ₱{(item?.quantity * item?.priceSnapshot).toFixed(2)}
                </span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};
export default OrderDetails;
