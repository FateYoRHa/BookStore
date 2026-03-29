import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useGetAdminOrderDetail } from "../../hooks/admin_order_hooks";
import { useParams } from "react-router-dom";
import { useState } from "react";
import {
  steps,
  formatDate,
  formatPhone,
  getProgress,
} from "../../utils/helpers";
const STATUS_OPTIONS = [
  "pending",
  "paid",
  "shipped",
  "out_for_delivery",
  "delivered",
  "cancelled",
];

const OrderUpdate = () => {
  const { id } = useParams();
  const { data: order, isPending } = useGetAdminOrderDetail(id);

  const [status, setStatus] = useState("");
  const [trackingNumber, setTrackingNumber] = useState(
    order?.shipping?.trackingNumber || "",
  );
  const [note, setNote] = useState("");

  if (isPending) return <div className="p-6">Loading...</div>;

  const isCancelled = order?.status === "cancelled";
  const currentIndex = steps.findIndex((s) => s.key === order?.status);

  const customer = order?.customer;
  const address = order?.shippingAddress;

  const handleSave = () => {
    const payload = {
      status: status || order?.status,
      trackingNumber,
      note,
    };

    console.log("UPDATE ORDER:", payload);
    // TODO: call mutation hook here
  };

  return (
    <div className="p-6 space-y-6 overflow-auto">
      {/* Editable Section */}
      <Card>
        <CardHeader>
          <CardTitle>Update Order</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            {/* Status Update */}
            <div>
              <p className="text-sm font-medium mb-1">Order Status</p>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger>
                  <SelectValue placeholder={order?.status} />
                </SelectTrigger>
                <SelectContent>
                  {STATUS_OPTIONS.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s.replaceAll("_", " ")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Tracking Number */}
            <div>
              <p className="text-sm font-medium mb-1">Tracking Number</p>
              <Input
                placeholder="Enter tracking number"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
              />
            </div>
          </div>

          {/* Admin Notes */}
          <div>
            <p className="text-sm font-medium mb-1">Admin Note</p>
            <Textarea
              placeholder="Add internal note..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>

          <Button onClick={handleSave}>Save Changes</Button>
        </CardContent>
      </Card>

      {/* Order Info */}
      <Card>
        <CardHeader>
          <CardTitle>Order #{order?._id}</CardTitle>
          <p className="text-sm text-muted-foreground">
            Placed on {formatDate(order?.createdAt)}
          </p>
        </CardHeader>
        <CardContent>
          <p className="font-semibold">Customer</p>
          <p className="text-sm text-muted-foreground">{customer?.name}</p>
          <p className="text-sm text-muted-foreground">
            +{formatPhone(customer?.phone)}
          </p>
          <p className="text-sm text-muted-foreground">
            {address?.street}, {address?.city}, {address?.zipCode},{" "}
            {address?.country}
          </p>
        </CardContent>
      </Card>

      {/* Status Tracker */}
      <Card>
        <CardHeader>
          <CardTitle>Status</CardTitle>
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
                          ? "bg-green-500 text-white"
                          : "bg-muted"
                    }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <p className="text-xs mt-2 text-center">{step.label}</p>
                </div>
              );
            })}
          </div>

          <div className="h-2 bg-muted rounded-full mt-4 overflow-hidden">
            <div
              className="h-full bg-black transition-all"
              style={{ width: `${getProgress(order?.status)}%` }}
            />
          </div>

          <div className="mt-3">
            <Badge variant={isCancelled ? "destructive" : "default"}>
              {order?.status}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Items */}
      <Card>
        <CardHeader>
          <CardTitle>Items</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {order?.items?.map((item) => (
            <div key={item._id} className="flex justify-between border-b pb-2">
              <span>{item.book?.title}</span>
              <span>₱{(item.quantity * item.priceSnapshot).toFixed(2)}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderUpdate;
