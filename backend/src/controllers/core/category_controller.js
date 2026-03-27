import { getCategoriesService } from "../../services/core/category_services.js";

export async function getCategories(req, res) {
  try {
    const categories = await getCategoriesService();
    res.status(200).json(categories);
  } catch (error) {
    console.log("Error retrieving categories", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
