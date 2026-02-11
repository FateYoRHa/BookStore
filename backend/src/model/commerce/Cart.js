import { mongoose, Schema } from "mongoose";

const cartSchema = new Schema(
  {
    customer: { type: mongoose.Schema.Types.ObjectId, ref: "Customer" }, // nullable for guest
    items: [
      {
        book: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Book",
          required: true,
        },
        quantity: { type: Number, min: 1, required: true },
        priceSnapshot: { type: Number, required: true },
      },
    ],
  },
  { timestamps: true },
);
cartSchema.index({ customer: 1 }, { unique: true });

export default mongoose.model("Cart", cartSchema);
