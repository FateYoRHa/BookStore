import { Featured } from "../../../model/index.js";

export async function getFeaturedItemsService() {
  return await Featured.find().populate("item").sort({ createdAt: -1 });
}

export async function addFeaturedItemService(featuredItem) {
  const { itemType, itemId, section, startDate, endDate } = featuredItem;
  return await Featured.create({
    itemType,
    item: itemId,
    section,
    startDate,
    endDate,
  });
}
export async function updateFeaturedItemService(featuredItem) {
  const { id, itemType, item, priority, starDate, endDate } = featuredItem;
  return await Featured.findByIdAndUpdate(
    id,
    { itemType, item, priority, starDate, endDate },
    { new: true },
  );
}
export async function removeFeaturedItemService(id) {
  return await Featured.findByIdAndDelete(id);
}
