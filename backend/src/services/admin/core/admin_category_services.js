import { Category } from "../../../model/index.js";
import { deleteImagesService } from "../content/admin_media_services.js";

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
  const exist = await Category.findOne({
    name: name,
    categoryCode: { $ne: catCode },
  }).lean();
  if (exist) {
    throw new Error("Category already exists.");
  }
  const catImage = await Category.findOne({ categoryCode: catCode }, "image");
  const publicId = catImage?.image?.public_id;

  if (publicId) {
    await deleteImagesService([publicId]);
  }

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
