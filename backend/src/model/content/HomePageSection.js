import { mongoose, Schema } from "mongoose";
const homepageSectionSchema = new Schema(
  {
    type: {
      type: String,
      enum: ["books", "authors", "categories", "mixed"],
      required: true,
    },

    title: { type: String, required: true },
    subtitle: String,

    references: [
      {
        refId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          refPath: "references.refModel",
        },
        refModel: {
          type: String,
          required: true,
          enum: ["Book", "Author", "Category"],
        },
        order: {
          type: Number,
          default: 0,
        },
      },
    ],

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  { timestamps: true },
);

export default mongoose.model("HomepageSection", homepageSectionSchema);
