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

export async function addFeaturedItem(req, res) {
  try {
    const { itemType, item, priority, starDate, endDate } = req.body;
    const featuredItem = await featuredItemService.addFeaturedItemService({
      itemType,
      item,
      priority,
      starDate,
      endDate,
    });
    res.status(201).json(featuredItem);
  } catch (error) {
    console.log("Error Getting Featured Item", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function updateFeaturedItem(req, res) {
  try {
    const { itemType, item, priority, starDate, endDate } = req.body;
    const id = req.params;
    const featuredItem = await featuredItemService.updateFeaturedItemService({
      id,
      itemType,
      item,
      priority,
      starDate,
      endDate,
    });
    res.status(200).json(featuredItem);
  } catch (error) {
    console.log("Error Getting Featured Item", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function removeFeaturedItem(req, res) {
  try {
    await featuredItemService.removeFeaturedItemService(req.params.id);
    res.status(200).json();
  } catch (error) {
    console.log("Error Getting Featured Item", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
