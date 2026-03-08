import { mongoose, Schema } from "mongoose";
import {
  PAYMENT_PROVIDERS,
  PAYMENT_STATUSES,
  PAYMENT_METHODS,
} from "../../constants/constant_values.js";
const paymentSchema = new Schema(
  {
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    provider: {
      type: String,
      required: true,
      default: "paymongo",
    },
    method: {
      type: String,
      enum: Object.values(PAYMENT_METHODS),
      required: true,
    },
    transactionId: {
      type: String,
      unique: true,
      sparse: true,
    },
    checkoutSessionId: {
      type: String,
      required: true,
      unique: true,
    },
    amount: { type: Number, required: true },
    status: {
      type: String,
      enum: Object.values(PAYMENT_STATUSES),
      default: PAYMENT_STATUSES.PENDING,
    },
    paidAt: Date,
  },
  { timestamps: true },
);

export default mongoose.model("Payment", paymentSchema);
