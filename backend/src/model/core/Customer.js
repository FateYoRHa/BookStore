import { mongoose, Schema } from "mongoose";
const customerSchema = new Schema(
  {
    customerCode: { type: String, unique: true, index: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      unique: true,
      required: true,
    },

    name: { type: String, required: true },

    phone: {
      type: String,
      unique: true,
    },

    address: [
      {
        street: String,
        city: String,
        zipCode: String,
        country: String,
        isDefault: Boolean,
      },
    ],
    image: { type: String, altText: String },
  },
  { timestamps: true },
);
export default mongoose.model("Customer", customerSchema);
