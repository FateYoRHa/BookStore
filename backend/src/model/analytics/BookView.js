import { mongoose, Schema } from "mongoose";
const bookViewSchema = new Schema(
  {
    book: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true },
    customer: { type: mongoose.Schema.Types.ObjectId, ref: "Customer" },
  },
  { timestamps: true },
);

export default mongoose.model("BookView", bookViewSchema);
