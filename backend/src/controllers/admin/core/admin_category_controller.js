import * as categoryService from "../../../services/admin/core/admin_category_services.js";

export async function getAdminCategories(req, res) {
  try {
    const categories = await categoryService.getCategoriesService();
    res.status(200).json(categories);
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ message: error.message || "Internal Server Error" });
  }
}
export async function addCategory(req, res) {
  try {
    const { name, description, image } = req.body;
    const category = await categoryService.addCategoryService({
      name,
      description,
      image,
    });

    res.status(201).json(category);
  } catch (error) {
    console.log("Error retrieving category", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
export async function updateCategory(req, res) {
  try {
    const { name, description, icon } = req.body;
    const catCode = req.params.id;
    const exist = await Category.findOne({ name: name }).lean();
    if (exist)
      return res.status(409).json({ message: `${name} already exist` });
    const category = await categoryService.updateCategoryService({
      catCode: catCode,
      name,
      description,
      icon,
    });
    res.status(200).json(category);
  } catch (error) {
    console.log("Error retrieving category", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
export async function deleteCategory(req, res) {
  try {
    await categoryService.deleteCategoryService(req.params.id);
    res.status(200).json({ message: "Category was deleted successfully" });
  } catch (error) {
    console.log("Error retrieving category", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
