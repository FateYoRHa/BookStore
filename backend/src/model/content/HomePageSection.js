import { mongoose, Schema } from "mongoose";
const homepageSectionSchema = new Schema(
  {
    type: {
      type: String,
      enum: [
        "hero",
        "categories",
        "best-sellers",
        "new-arrivals",
        "author-spotlight",
      ],
      required: true,
    },
    title: String,
    subtitle: String,
    referenceIds: [{ type: mongoose.Schema.Types.ObjectId }],
    order: Number,
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export default mongoose.model("HomepageSection", homepageSectionSchema);
