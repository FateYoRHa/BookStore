import { mongoose, Schema } from "mongoose";
import Counter from "../assets/counter.js";

const PREFIX = "CUS";
const PAD = 4;
const customerSchema = new Schema({
  customerId: { type: String, unique: true, index: true },
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [/.+\@.+\..+/, "Please enter a valid email address."],
  },
  password: { type: String, required: true }, //to be added (min/max, must have special char's, number)
  address: { type: String, required: true },
  contactNumber: { type: Number, required: true, unique: true },
});

customerSchema.pre("save", async function () {
  if (this.customerId) return;
  const counter = await Counter.findOneAndUpdate(
    { key: "customer" },
    { $inc: { value: 1 } },
    { new: true, upsert: true },
  );
  const number = counter.value.toString().padStart(PAD, 0);
  this.customerId = `${PREFIX}-${number}`;
});

export default mongoose.model("Customer", customerSchema);
