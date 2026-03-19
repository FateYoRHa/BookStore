import * as featuredItemService from "../../services/content/featureditem_services.js";

export async function getFeaturedItem(req, res) {
  try {
    const item = await featuredItemService.getFeaturedItemsService(
      req.params.section,
    );
    res.status(200).json(item);
  } catch (error) {
    console.log("Error Getting Featured Item", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}