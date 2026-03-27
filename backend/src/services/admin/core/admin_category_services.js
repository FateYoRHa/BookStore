import { Category } from "../../../model/index.js";

export async function getCategoriesService() {
  const categories = await Category.find().sort({ createdAt: -1 });
  return categories;
}

export async function addCategoryService(category) {
  const { name, description, image } = category;
  const exist = await Category.findOne({ name: name }).lean();
  if (exist) {
    throw new Error("Category already exists.");
  }
  const newCategory = new Category({
    name,
    description,
    image: {
      url: image.url,
      public_id: image.public_id,
      altText: name,
    },
  });

  await newCategory.save();
  return newCategory;
}
export async function updateCategoryService(category) {
  const { catCode, name, description, image } = category;
  const exist = await Category.findOne({ name: name }).lean();
  if (exist) return res.status(409).json({ message: `${name} already exist` });
  const updateCategory = await Category.findOneAndUpdate(
    { categoryCode: catCode },
    {
      name,
      description,
      image: { url: image.url, public_id: image.public_id, altText: name },
    },
    { new: true },
  );
  return updateCategory;
}
export async function deleteCategoryService(category) {
  return await Category.findOneAndDelete({ catCode: category });
}
