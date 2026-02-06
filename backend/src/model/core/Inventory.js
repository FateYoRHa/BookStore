import {mongoose, Schema} from "mongoose";
const inventorySchema = new Schema(
  {
    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
      required: true,
      unique: true,
    },
    quantity: { type: Number, default: 0 },
    reserved: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ["in-stock", "low-stock", "out-of-stock"],
      default: "in-stock",
    },
  },
  { timestamps: true },
);

export default mongoose.model("Inventory", inventorySchema);
