export const imageSchema = new Schema({
  url: { type: String, required: true },
  public_id: { type: String },
  altText: { type: String },
});
