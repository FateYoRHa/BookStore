import { Schema, mongoose } from "mongoose";
import imageSchema from "../../utis/imageSchema.js";
const bookImageSchema = new Schema(
  {
    book: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true },
    image: imageSchema,
    order: { type: Number, default: 0 },
    type: {
      type: String,
      enum: ["cover", "preview", "thumbnail"],
      default: "cover",
    },
    public_id: { type: String, required: true },
  },
  { timestamps: true },
);

export default mongoose.model("BookImage", bookImageSchema);
