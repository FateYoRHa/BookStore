import { mongoose, Schema } from "mongoose";
import { ANALYTICS_TYPES } from "../../constants/constant_values.js";
const analyticsEventSchema = new Schema(
  {
    type: {
      type: String,
      enum: Object.values(ANALYTICS_TYPES),
      required: true,
    },

    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
    },

    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
    },

    metadata: {
      type: Object, // optional: IP, device, source, etc.
    },
  },
  { timestamps: true },
);
analyticsEventSchema.index(
  { createdAt: 1 },
  { expireAfterSeconds: 60 * 60 * 24 * 30 }, // 30 days
);
export default mongoose.model("AnalyticEvent", analyticsEventSchema);
