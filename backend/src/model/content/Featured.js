import { mongoose, Schema } from "mongoose";
import { FEATURED_SECTIONS } from "../../constants/constant_values.js";
import Counter from "../../assets/counter.js";

const PREFIX = "FEAT";
const PAD = 4;
const featuredItemSchema = new Schema(
  {
    featuredCode: { type: String, unique: true, index: true },
    itemType: {
      type: String,
      enum: ["Book", "Author", "Category"],
      required: true,
    },
    item: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "itemType",
    },
    section: {
      type: String,
      enum: Object.values(FEATURED_SECTIONS),
      required: true,
      index: true,
    },
    priority: { type: Number, default: 0 },
    startDate: Date,
    endDate: Date,
  },
  { timestamps: true },
);
//THIS ADDS PREFIX TO ID

featuredItemSchema.pre("save", async function () {
  //PRESAVE HOOK
  if (this.featuredCode) return;
  const counter = await Counter.findOneAndUpdate(
    { key: "featured" },
    { $inc: { value: 1 } },
    { new: true, upsert: true },
  );
  const number = counter.value.toString().padStart(PAD, 0);
  this.featuredCode = `${PREFIX}-${number}`;
});
export default mongoose.model("Featured", featuredItemSchema);
