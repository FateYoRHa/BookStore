import { mongoose, Schema } from "mongoose";
const newsletterSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    source: { type: String, default: "homepage" },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export default mongoose.model("Newsletter", newsletterSchema);
