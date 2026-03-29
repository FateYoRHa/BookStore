import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, Truck, Package, Clipboard } from "lucide-react";

const steps = [
  { label: "Processing", icon: CheckCircle, completed: true },
  { label: "Shipped", icon: Truck, completed: true },
  { label: "Out for Delivery", icon: Package, completed: false },
  { label: "Delivered", icon: Clipboard, completed: false },
];

const OrderDetails = () => {
  return (
    <div className="p-6 space-y-6 overflow-auto">
      {/* Top Section */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Order Info */}
        <Card>
          <CardHeader>
            <CardTitle>Order ORD-12345</CardTitle>
            <p className="text-sm text-muted-foreground">
              Placed on 2025-04-15
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="font-semibold">Customer Information</p>
              <p className="text-sm text-muted-foreground">Alice Johnson</p>
              <p className="text-sm text-muted-foreground">alice@example.com</p>
              <p className="text-sm text-muted-foreground">
                123 Main St, Anytown
              </p>
            </div>

            <Card className="p-4 flex items-center justify-between">
              <div>
                <p className="font-medium">Payment Method</p>
                <p className="text-sm text-muted-foreground">
                  Visa ending in **** 1234
                </p>
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
              <span>$101.97</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>$10.00</span>
            </div>
            <Separator />
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>$111.97</span>
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
              return (
                <div key={index} className="flex flex-col items-center flex-1">
                  <div
                    className={`rounded-full p-3 ${
                      step.completed ? "bg-green-500 text-white" : "bg-muted"
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
            <div className="h-full bg-black w-1/2" />
          </div>

          <div className="mt-3">
            <Badge>Shipped</Badge>
            <span className="text-sm text-muted-foreground ml-2">
              on December 23, 2024
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Order Items */}
      <Card>
        <CardHeader>
          <CardTitle>Order Items</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            { name: "Wireless Headphones", qty: 2, price: 25.99 },
            { name: "Bluetooth Speaker", qty: 1, price: 49.99 },
          ].map((item, i) => (
            <div
              key={i}
              className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-muted rounded" />
                <p>{item.name}</p>
              </div>

              <div className="flex gap-10 text-sm">
                <span>{item.qty}</span>
                <span>${item.price.toFixed(2)}</span>
                <span>${(item.qty * item.price).toFixed(2)}</span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};
export default OrderDetails;
