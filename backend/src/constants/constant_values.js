export const PAYMENT_PROVIDERS = {
  STRIPE: "stripe",
  PAYPAL: "paypal",
  PAYMONGO: "paymongo",
  COD: "CoD",
};

export const PAYMENT_METHODS = {
  COD: "CoD",
  CARD: "credit_card",
  PAYPAL: "paypal",
  GCASH: "gcash",
  BANK: "bank_transfer",
};

export const PAYMENT_STATUSES = {
  PENDING: "pending",
  PAID: "paid",
  FAILED: "failed",
  REFUNDED: "refunded",
};

export const ORDER_STATUSES = {
  PENDING: "pending",
  PAID: "paid",
  SHIPPED: "shipped",
  DELIVERED: "delivered",
  CANCELLED: "cancelled",
};
