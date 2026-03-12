import mongoose from "mongoose";
import Counter from "../../assets/counter.js";

const PREFIX = "AU";
const PAD = 4;

const authorSchema = new mongoose.Schema(
  {
    authorCode: { type: String, unique: true, index: true },
    penName: { type: String, unique: true },
    bio: { type: String, required: true },
    image: { url: String, alt: String },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);
// VIRTUAL SCHEMA FOR BOOKS
authorSchema.virtual("books", {
  ref: "Book",
  localField: "_id",
  foreignField: "author",
});
//THIS ADDS PREFIX TO ID

authorSchema.pre("save", async function () {
  //PRESAVE HOOK
  if (this.authorCode) return;
  const counter = await Counter.findOneAndUpdate(
    { key: "author" },
    { $inc: { value: 1 } },
    { new: true, upsert: true },
  );
  const number = counter.value.toString().padStart(PAD, 0);
  this.authorCode = `${PREFIX}-${number}`;
});

export default mongoose.model("Author", authorSchema);
