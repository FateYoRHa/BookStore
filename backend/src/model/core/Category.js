import { Schema, mongoose } from "mongoose";
import Counter from "../../assets/counter.js";
const PREFIX = "CAT";
const PAD = 4;

const categorySchema = new Schema({
  categoryCode: { type: String, unique: true, index: true },
  name: { type: String, unique: true, required: true },
  description: { type: String, required: true },
  icon: { type: String, required: true },
  isFeatured: { type: Boolean, default: false },
  sortOrder: { type: Number, default: 0 },
});

categorySchema.pre("save", () => {
  if (this.categoryCode) return;
  const counter = Counter.findByIdAndUpdate(
    { key: "category" },
    { $inc: { value: 1 } },
    { upsert: true },
  );
  const number = counter.value.toString().padStart(PAD, 0);
  this.categoryCode = `${PREFIX}-${number}`;
});

export default mongoose.model("Category", categorySchema);
