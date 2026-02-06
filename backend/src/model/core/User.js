import mongoose from "mongoose";
import Counter from "../../assets/counter.js";

const { Schema } = mongoose;
const PREFIX = "USER";
const PAD = 4;

const userSchema = new Schema(
  {
    userCode: { type: String, unique: true, index: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: [/.+\@.+\..+/, "Please enter a valid email address."],
    },

    password: { type: String, required: true },

    role: {
      type: String,
      enum: ["customer", "admin"],
      default: "customer",
    },
  },
  { timestamps: true },
);

//THIS ADDS PREFIX TO ID

userSchema.pre("save", async function () {
  //PRESAVE HOOK
  if (this.userCode) return;
  const counter = await Counter.findOneAndUpdate(
    { key: "user" },
    { $inc: { value: 1 } },
    { new: true, upsert: true },
  );
  const number = counter.value.toString().padStart(PAD, 0);
  this.userCode = `${PREFIX}-${number}`;
});
export default mongoose.model("User", userSchema);
