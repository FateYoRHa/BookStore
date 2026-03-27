import { Category } from "../../model/index.js";

export async function getCategoriesService() {
  const categories = await Category.find().sort({ name: 1 });
  return categories;
}
