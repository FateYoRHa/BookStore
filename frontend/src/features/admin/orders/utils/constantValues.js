import { CheckCircle, Truck, Package, Clipboard, Package2 } from "lucide-react";

export const STATUS_ACTIONS = {
  pending: {
    label: "Mark as Paid",
    next: "paid",
  },
  paid: {
    label: "Ship",
    next: "shipped",
  },
  shipped: {
    label: "Out for Delivery",
    next: "out_for_delivery",
  },
  out_for_delivery: {
    label: "Mark as Delivered",
    next: "delivered",
  },
  delivered: {
    label: "Mark as Paid",
    next: "paid",
  },
};
export const steps = [
  { key: "pending", label: "Pending", icon: CheckCircle },
  { key: "paid", label: "Preparing", icon: Package2 },
  { key: "shipped", label: "Shipped", icon: Truck },
  { key: "out_for_delivery", label: "Out for Delivery", icon: Package },
  { key: "delivered", label: "Delivered", icon: Clipboard },
];
export const ORDER_STATUS = [
  "pending",
  "paid",
  "shipped",
  "out_for_delivery",
  "delivered",
  "cancelled",
];
