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
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);
// VIRTUAL SCHEMA FOR IMAGE
bookSchema.virtual("images", {
  ref: "BookImage",
  localField: "_id",
  foreignField: "book",
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
