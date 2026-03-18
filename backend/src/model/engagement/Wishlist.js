import { mongoose, Schema } from "mongoose";
const wishlistSchema = new Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
      unique: true,
    },
    books: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book" }],
  },
  { timestamps: true },
);

export default mongoose.model("Wishlist", wishlistSchema);
