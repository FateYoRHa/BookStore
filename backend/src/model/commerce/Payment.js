import { mongoose, Schema } from "mongoose";
const paymentSchema = new Schema(
  {
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    provider: { type: String, required: true }, // Stripe, PayPal, etc.
    transactionId: { type: String, required: true },
    amount: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "paid", "failed", "refunded"],
      default: "pending",
    },
    paidAt: Date,
  },
  { timestamps: true },
);

export default mongoose.model("Payment", paymentSchema);
