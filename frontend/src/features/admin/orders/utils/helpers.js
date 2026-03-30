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
export const formatPhone = (phoneNumber) => {
  if (!phoneNumber) return "-";
  const cleaned = ("" + phoneNumber).replace(/\D/g, "");
  const match = cleaned.match(/^(\d{3})(\d{3,4})(\d{4})$/);
  return match ? `(${match[1]}) ${match[2]}-${match[3]}` : phoneNumber;
};

export const getProgress = (status) => {
  const index = steps.findIndex((s) => s.key === status);
  if (index === -1 || status === "cancelled") return 0;
  return ((index + 1) / steps.length) * 100;
};
export const formatDate = (dateString) => {
  if (!dateString) return "-";
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "2-digit",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  }).format(new Date(dateString));
};
