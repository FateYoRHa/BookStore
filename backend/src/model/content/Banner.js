import { mongoose, Schema } from "mongoose";
import { imageSchema } from "../../utis/imageSchema.js";
const bannerSchema = new Schema(
  {
    title: String,
    image: imageSchema,
    link: String,
    startDate: Date,
    endDate: Date,
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export default mongoose.model("Banner", bannerSchema);
