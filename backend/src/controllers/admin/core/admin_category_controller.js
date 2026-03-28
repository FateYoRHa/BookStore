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
    const { name, description, image } = req.body;
    const catCode = req.params.id;
    const category = await categoryService.updateCategoryService({
      catCode,
      name,
      description,
      image,
    });
    res.status(200).json(category);
  } catch (error) {
    console.log("Error retrieving category", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
export async function removeCategory(req, res) {
  try {
    await categoryService.removeCategoryService(req.params.id);
    return res.sendStatus(204);
  } catch (error) {
    console.log("Error retrieving category", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
