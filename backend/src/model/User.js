import mongoose from "mongoose";
import Counter from "../assets/counter.js";

const { Schema } = mongoose;
const PREFIX = "USR";
const PAD = 4;

const userSchema = new Schema(
  {
    userId: { type: String, unique: true, index: true },
    username: { type: String, required: [true, "username is required"] },
    password: { type: String, required: [true, "passsword is required"] },
    address: { type: String, required: [true, "address is required"] },
  },
  {
    timestamps: true,
  },
);

//THIS ADDS PREFIX TO ID

userSchema.pre("save", async function () {
  //PRESAVE HOOK
  if (this.userId) return;
  const counter = await Counter.findOneAndUpdate(
    { key: "user" },
    { $inc: { value: 1 } },
    { new: true, upsert: true },
  );
  const number = counter.value.toString().padStart(PAD, 0);
  this.userId = `${PREFIX}-${number}`;
});
export default mongoose.model("User", userSchema);

