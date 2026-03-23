import mongoose from "mongoose";
import Counter from "../../assets/counter.js";

const { Schema } = mongoose;
const PREFIX = "BOOK";
const PAD = 4;

const bookSchema = new Schema(
  {
    bookCode: { type: String, unique: true, index: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Author",
      required: true,
    },

    publisher: { type: String, required: true },

    publicationDate: { type: Date, required: true },

    categories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
      },
    ],
    price: { type: Number, required: true },
    pages: { type: Number, required: true },
    language: { type: String, required: true },
    status: {
      type: String,
      enum: ["available", "unavailable"],
      default: "available",
    },
    deletedAt: { type: Date, default: null, index: true },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);
// VIRTUAL SCHEMA FOR IMAGE
bookSchema.virtual("reviews", {
  ref: "Review",
  localField: "_id",
  foreignField: "book",
});
// VIRTUAL SCHEMA FOR REVIEW
bookSchema.virtual("images", {
  ref: "BookImage",
  localField: "_id",
  foreignField: "book",
});
// VS for inventory
bookSchema.virtual("inventory", {
  ref: "Inventory",
  localField: "_id",
  foreignField: "book",
  justOne: true,
});
//THIS ADDS PREFIX TO ID

bookSchema.pre("save", async function () {
  //PRESAVE HOOK
  if (this.bookCode) return;
  const counter = await Counter.findOneAndUpdate(
    { key: "book" },
    { $inc: { value: 1 } },
    { new: true, upsert: true },
  );
  const number = counter.value.toString().padStart(PAD, 0);
  this.bookCode = `${PREFIX}-${number}`;
});

export default mongoose.model("Book", bookSchema);
