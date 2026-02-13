import mongoose from "mongoose";
import Counter from "../../assets/counter.js";
import bcrypt from "bcrypt";

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
    },

    password: { type: String, required: true },

    role: {
      type: String,
      enum: ["customer", "admin"],
      default: "customer",
    },
    isOAuth: { type: Boolean, default: false },
  },
  { timestamps: true },
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  // Only hash if the password has been modified
  this.password = await bcrypt.hash(this.password, 12); // 12 is the salt rounds
});
// Method to compare the input password with the stored hash
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

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
