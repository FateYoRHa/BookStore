import { Inventory } from "../../model/index.js";

export async function updateInventoryService(items) {
  return await Inventory.bulkWrite(
    items.map((item) => ({
      updateOne: {
        filter: { book: item.book },
        update: { $inc: { quantity: -item.quantity } },
        new: true,
      },
    })),
  );
}
