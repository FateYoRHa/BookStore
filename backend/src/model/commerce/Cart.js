import { mongoose, Schema } from "mongoose";
const cartItemSchema = new Schema({
  book: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true },
  quantity: { type: Number, min: 1, required: true },
  priceSnapshot: { type: Number, required: true },
});

const cartSchema = new mongoose.Schema(
  {
    customer: { type: mongoose.Schema.Types.ObjectId, ref: "Customer" }, // nullable for guest
    items: [cartItemSchema],
  },
  { timestamps: true },
);

export default mongoose.model("Cart", cartSchema);
