import { mongoose, Schema } from "mongoose";
const bannerSchema = new Schema(
  {
    title: String,
    image: { type: String, required: true },
    link: String,
    startDate: Date,
    endDate: Date,
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export default mongoose.model("Banner", bannerSchema);
