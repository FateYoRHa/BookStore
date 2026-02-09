import { Category } from "../../model/index.js";
import * as categoryService from "../../services/core/category_services.js";
export async function getCategories(req, res) {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    console.log("Error retrieving categories", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getCategory(req, res) {
  try {
    const category = await Category.findOne({ catCode: req.params.id });
    res.status(200).json(category);
  } catch (error) {
    console.log("Error retrieving category", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function addCategory(req, res) {
  try {
    const { name, description, icon } = req.body;
    const exist = await Category.findOne({ name: name }).lean();
    if (exist)
      return res.status(409).json({ message: `${name} already exist` });
    const category = new categoryService.addCategoryService({
      name,
      description,
      icon,
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
