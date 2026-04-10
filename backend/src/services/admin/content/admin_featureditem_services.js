import { Featured } from "../../../model/index.js";

export async function getFeaturedItemsService() {
  let featuredItems = await Featured.find().populate("item");
  if (!featuredItems) {
    const error = new Error("Featured item not found");
    error.status = 404;
    throw error;
  }
  // POPULATE IMAGES FOR BOOKS
  featuredItems = await Promise.all(
    featuredItems.map(async (featured) => {
      if (featured.itemType === "Book") {
        await featured.populate({
          path: "item",
          populate: { path: "images", select: "image" },
        });
      }
      return featured;
    }),
  );
  return featuredItems;
}

export async function getFeaturedItemService(id) {
  const featured = await Featured.findOne({ featuredCode: id }).populate(
    "item",
  );
  if (!featured) {
    const error = new Error("Featured item not found");
    error.status = 404;
    throw error;
  }
  if (featured.itemType === "Book") {
    await featured.populate({
      path: "item",
      populate: [
        { path: "author", select: "penName image" },
        { path: "categories", select: "name" },
        { path: "images" },
        {
          path: "reviews",
          select: "rating comment",
          populate: {
            path: "customer",
            select: "name image",
          },
          options: { sort: { createdAt: -1 } },
        },
        { path: "inventory", select: "quantity status" },
      ],
    });
  }
  return featured;
}

export async function addFeaturedItemService(featuredItem) {
  const { itemType, itemId, section, startDate, endDate } = featuredItem;
  const newFeaturedItem = new Featured({
    itemType,
    item: itemId,
    section,
    startDate,
    endDate,
  });
  return await newFeaturedItem.save();
}
export async function updateFeaturedItemService(featuredItem) {
  const { id, itemType, itemId, section, startDate, endDate } = featuredItem;
  return await Featured.findOneAndUpdate(
    { featuredCode: id },
    { itemType, itemId, section, startDate, endDate },
    { new: true },
  );
}
export async function removeFeaturedItemService(id) {
  return await Featured.findByIdAndDelete(id);
}
