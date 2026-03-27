import { Category } from "../../../model/index.js";

export async function getCategoriesService() {
  const categories = await Category.find().sort({ createdAt: -1 });
  return categories;
}

export async function addCategoryService(category) {
  const { name, description, icon } = category;
  const newCategory = new Category({
    name,
    description,
    icon,
  });

  await newCategory.save();
  return newCategory;
}
export async function updateCategoryService(category) {
  const { catCode, name, description, icon } = category;
  const updateCategory = await Category.findOneAndUpdate(
    { catCode: catCode },
    { name, description, icon },
    { new: true },
  );
  return updateCategory;
}
export async function deleteCategoryService(category) {
  return await Category.findOneAndDelete({ catCode: category });
}
