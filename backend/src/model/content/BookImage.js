import { Schema, mongoose } from "mongoose";

const bookImageSchema = new Schema(
  {
    book: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true },
    url: { type: String, required: true },
    altText: String,
    order: { type: Number, default: 0 },
    type: {
      type: String,
      enum: ["cover", "preview", "thumbnail"],
      default: "cover",
    },
  },
  { timestamps: true },
);

export default mongoose.model("BookImage", bookImageSchema)
