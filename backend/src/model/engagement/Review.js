import { mongoose, Schema } from "mongoose";
const reviewSchema = new Schema(
  {
    book: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    rating: { type: Number, min: 1, max: 5, required: true },
    comment: String,
    isVerifiedPurchase: { type: Boolean, default: false },
  },
  { timestamps: true },
);
reviewSchema.index({ book: 1, customer: 1 }, { unique: true });

export default mongoose.model("Review", reviewSchema);
