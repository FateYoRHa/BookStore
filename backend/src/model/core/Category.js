import { Schema, mongoose } from "mongoose";
import Counter from "../../assets/counter.js";
import { imageSchema } from "../../utis/imageSchema.js";
const PREFIX = "CAT";
const PAD = 4;

const categorySchema = new Schema(
  {
    categoryCode: { type: String, unique: true, index: true },
    name: { type: String, unique: true, required: true },
    description: { type: String, required: true },
    image: imageSchema,
    deletedAt: { type: Date, default: null, index: true },
    isFeatured: { type: Boolean, default: false },
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true },
);

categorySchema.pre("save", async function () {
  if (this.categoryCode) return;
  const counter = Counter.findOneAndUpdate(
    { key: "category" },
    { $inc: { value: 1 } },
    { upsert: true, new: true },
  );
  const number = counter.value.toString().padStart(PAD, 0);
  this.categoryCode = `${PREFIX}-${number}`;
});

export default mongoose.model("Category", categorySchema);
