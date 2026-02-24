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
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);
cartSchema.index({ customer: 1 }, { unique: true });

cartSchema.virtual("images", {
  ref: "BookImage",
  localField: "_id",
  foreignField: "book",
  justOne: true,
});

cartSchema.virtual("inventory", {
  ref: "Inventory",
  localField: "_id",
  foreignField: "book",
  justOne: true,
});

export default mongoose.model("Cart", cartSchema);
