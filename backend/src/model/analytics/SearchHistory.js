import { mongoose, Schema } from "mongoose";
const searchHistorySchema = new Schema(
  {
    customer: { type: mongoose.Schema.Types.ObjectId, ref: "Customer" },
    query: { type: String, required: true },
  },
  { timestamps: true },
);

export default mongoose.model("SearchHistory", searchHistorySchema);
