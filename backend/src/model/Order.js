import { Schema, mongoose } from "mongoose";
import Counter from "../assets/counter.js";

const PREFIX = "ORD";
const PAD = 4;
// CURRENT TIMEZONE IS SET AT UTC(MONGODB DEFAULT)
const orderSchema = new Schema({
  orderId: { type: String, unique: true, index: true },
  customerId: { type: String, required: true },
  items: [{ type: String, required: true }],
  shippingDetails: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (createdAt) =>
      createdAt.toLocaleDateString("en-US", {
        timeZone: "Asia/Singapore",
      }),
  },
  updatedAt: {
    type: Date,
    default: Date.now,
    get: (updatedAt) =>
      updatedAt.toLocaleDateString("en-US", {
        timeZone: "Asia/Singapore",
      }),
  },
});

orderSchema.pre("save", async function () {
  if (this.orderId) return;
  const counter = await Counter.findOneAndUpdate(
    { key: "orders" },
    { $inc: { value: 1 } },
    { new: true, upsert: true },
  );
  const number = counter.value.toString().padStart(PAD, 0);
  this.orderId = `${PREFIX}-${number}`;
});

export default mongoose.model("Orders", orderSchema);
