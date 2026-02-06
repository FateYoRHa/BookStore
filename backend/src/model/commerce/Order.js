import { Schema, mongoose } from "mongoose";
import Counter from "../../assets/counter.js";

const PREFIX = "ORD";
const PAD = 4;
// CURRENT TIMEZONE IS SET AT UTC(MONGODB DEFAULT)

const orderSchema = new Schema(
  {
    orderCode: { type: String, unique: true, index: true }, // ORD-0001

    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },

    items: [
      {
        book: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Book",
        },
        quantity: { type: Number, required: true },
        priceSnapshot: { type: Number, required: true },
      },
    ],

    shippingAddress: {
      street: String,
      city: String,
      postalCode: String,
      country: String,
    },
    // 
    status: {
      type: String,
      enum: ["pending", "paid", "shipped", "delivered", "cancelled"],
      default: "pending",
    },

    totalAmount: { type: Number, required: true },
  },
  { timestamps: true },
);

orderSchema.pre("save", async function () {
  if (this.orderCode) return;
  const counter = await Counter.findOneAndUpdate(
    { key: "orders" },
    { $inc: { value: 1 } },
    { new: true, upsert: true },
  );
  const number = counter.value.toString().padStart(PAD, 0);
  this.orderCode = `${PREFIX}-${number}`;
});

export default mongoose.model("Orders", orderSchema);
