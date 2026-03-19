import { Category } from "../../model/index.js";
// TODO add service
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
