import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useGetAdminOrderDetail } from "../../hooks/admin_order_hooks";
import { formatDate, formatPhone, getProgress } from "../../utils/helpers";
import { steps, STATUS_ACTIONS } from "../../utils/constantValues";
import { updateOrderSchema } from "../../orderSchema";
import { cn } from "@/lib/utils";
import { ConfirmAction } from "@/components/ConfirmAction";
import FormFieldError from "@/components/forms/FormFieldError";
const OrderUpdate = () => {
  const { id } = useParams();
  const { data: order, isPending } = useGetAdminOrderDetail(id);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    resolver: zodResolver(updateOrderSchema),
    defaultValues: {
      status: "",
      note: "",
      trackingNumber: "",
    },
  });

  // Load order data
  let status = watch("status");
  useEffect(() => {
    if (!order) return;
    reset({
      status: order?.status,
      note: "",
      trackingNumber: order?.shipping?.trackingNumber || "",
    });
  }, [order, reset]);
  if (isPending) return <div className="p-6">Loading...</div>;
  const isCancelled = order?.status === "cancelled";
  const currentIndex = steps.findIndex((s) => s.key === order?.status);

  const customer = order?.customer;
  const address = order?.shippingAddress;
  const handleUpdateStatus = (action) => {
    status = action;
    console.log(status);
  };
  const handleSave = (data) => {
    const payload = {
      ...data,
      status: status,
    };
    console.log("UPDATE ORDER:", payload);
    // TODO: call mutation hook here
  };
  const action = STATUS_ACTIONS[status];
  return (
    <div className="p-6 space-y-6 overflow-auto">
      {/* Editable Section */}
      <Card>
        <CardHeader>
          <CardTitle>Update Order: {order?.orderCode}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(handleSave)} className="space-y-6">
            {/* Top Section */}
            <div className="grid md:grid-cols-2 gap-6 border rounded-lg p-4">
              {/* STATUS SECTION */}
              <div className="flex flex-col gap-3">
                <p className="text-sm font-medium">Order Status</p>

                <Badge className="uppercase w-fit">{status}</Badge>

                <div className="flex items-center gap-2 flex-wrap">
                  {action && (
                    <ConfirmAction
                      label={action.label}
                      onConfirm={() => handleUpdateStatus(action.next)}
                      disabled={isCancelled || status === "delivered"}
                      confirmText={`Mark order as ${action.next}?`}
                      description={`This action cannot be undone.`}
                      className={
                        action.next === "delivered"
                          ? "bg-green-500 text-white"
                          : ""
                      }
                    />
                  )}

                  {!["delivered", "cancelled"].includes(status) && (
                    <ConfirmAction
                      label="Cancel Order"
                      variant="destructive"
                      onConfirm={() => handleUpdateStatus("cancelled")}
                      confirmText="Cancel this order?"
                      description="This action cannot be undone."
                    />
                  )}
                </div>
              </div>

              {/* TRACKING */}
              <div className="flex flex-col gap-2">
                <p className="text-sm font-medium">Tracking Number</p>

                <Input
                  {...register("trackingNumber")}
                  placeholder="Enter tracking number"
                  disabled={["pending", "paid"].includes(status)} // ✅ better rule
                  className={cn(
                    errors?.trackingNumber &&
                      "border-red-500 focus-visible:ring-red-500",
                  )}
                />

                <FormFieldError error={errors?.trackingNumber} />
              </div>
            </div>

            {/* ADMIN NOTE */}
            <div className="flex flex-col gap-2">
              <p className="text-sm font-medium">Admin Note</p>

              <Textarea
                {...register("note")}
                placeholder="Add internal note..."
                className={cn(
                  errors?.note && "border-red-500 focus-visible:ring-red-500",
                )}
              />

              <FormFieldError error={errors?.note} />
            </div>

            {/* ACTION */}
            <div className="flex justify-end">
              <Button type="submit">Save Changes</Button>
            </div>
          </form>
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
