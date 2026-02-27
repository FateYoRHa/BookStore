import { mongoose, Schema } from "mongoose";
import Counter from "../../assets/counter.js";
const customerSchema = new Schema(
  {
    customerCode: { type: String, unique: true, index: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      unique: true,
      required: true,
    },

    name: { type: String, required: true },

    phone: {
      type: String,
      unique: true,
    },

    address: [
      {
        street: String,
        city: String,
        zipCode: String,
        country: String,
        isDefault: Boolean,
      },
    ],
    image: {
      url: String,
      public_id: String,
    },
  },
  { timestamps: true },
);
customerSchema.pre("save", async function () {
  if (this.customerCode) return;
  const counter = await Counter.findOneAndUpdate(
    { key: "customer" },
    { $inc: { value: 1 } },
    { upsert: true, new: true },
  );
  const number = counter.value.toString().padStart(4, 0);
  this.customerCode = `CUST-${number}`;
});
export default mongoose.model("Customer", customerSchema);
