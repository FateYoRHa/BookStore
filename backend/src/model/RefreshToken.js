import { Schema, mongoose } from "mongoose";
import bcrypt from "bcrypt";
const refreshTokenSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    deviceId: { type: String, required: true },
    token: {
      type: String,
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true },
);

refreshTokenSchema.pre("save", async function () {
  if (!this.isModified("token")) return;
  // Only hash if the password has been modified
  this.token = await bcrypt.hash(this.token, 12); // 12 is the salt rounds
});
// Method to compare the refresh tokens with the stored hash
refreshTokenSchema.methods.compareRefreshToken = async function (token) {
  return await bcrypt.compare(token, this.token);
};
export const RefreshToken = mongoose.model("RefreshToken", refreshTokenSchema);
