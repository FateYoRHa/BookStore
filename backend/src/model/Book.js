import mongoose from "mongoose";
import Counter from "../assets/counter.js";

const { Schema } = mongoose;
const PREFIX = "BOOK";
const PAD = 4;

const bookSchema = new Schema(
  {
    bookId: { type: String, unique: true, index: true },
    title: { type: String, required: [true, "Title is required"] },
    author: { type: String },
    publisher: { type: String, required: [true, "Publisher is required"] },
    publicationDate: {
      type: Date,
      required: true,
      get: (publicationDate) => publicationDate.toLocaleDateString("en-US"),
    },
    genre: { type: String, required: true },
    img: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

//THIS ADDS PREFIX TO ID

bookSchema.pre("save", async function () {
  //PRESAVE HOOK
  if (this.bookId) return;
  const counter = await Counter.findOneAndUpdate(
    { key: "book" },
    { $inc: { value: 1 } },
    { new: true, upsert: true },
  );
  const number = counter.value.toString().padStart(PAD, 0);
  this.bookId = `${PREFIX}-${number}`;
});

export default mongoose.model("Book", bookSchema);
