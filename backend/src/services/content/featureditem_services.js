import { Featured } from "../../model/index.js";

export async function getFeaturedItemsService(section) {
  return Featured.find({
    section,
    startDate: { $lte: new Date() },
    endDate: { $gte: new Date() },
  })
    .sort({ priority: -1 })
    .populate("item");
}