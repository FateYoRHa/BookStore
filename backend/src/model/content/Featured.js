import { mongoose, Schema } from "mongoose";
const featuredItemSchema = new Schema(
  {
    itemType: {
      type: String,
      enum: ["Book", "Author", "Category"],
      required: true,
    },
    item: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "itemType",
    },
    section: {
      type: String,
      enum: ["hero", "best-seller", "new-arrival"],
      required: true,
      index: true,
    },
    priority: { type: Number, default: 0 },
    startDate: Date,
    endDate: Date,
  },
  { timestamps: true },
);

export default mongoose.model("Featured", featuredItemSchema);
