import mongoose from "mongoose";
import Counter from "../assets/counter.js";

const PREFIX = "AU";
const PAD = 4;

const authorSchema = new mongoose.Schema({
  authorId: { type: String, unique: true, index: true },
  penName: { type: String, unique: true },
  bio: { type: String, required: true },
});

//THIS ADDS PREFIX TO ID

authorSchema.pre("save", async function () {
  //PRESAVE HOOK
  if (this.authorId) return;
  const counter = await Counter.findOneAndUpdate(
    { key: "author" },
    { $inc: { value: 1 } },
    { new: true, upsert: true },
  );
  const number = counter.value.toString().padStart(PAD, 0);
  this.authorId = `${PREFIX}-${number}`;
});

export default mongoose.model("Author", authorSchema);
