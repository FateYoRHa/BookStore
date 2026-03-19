import { Inventory } from "../../../model/index.js";

export async function initializeInventory(bookId, quantity) {
  return Inventory.create({
    book: bookId,
    quantity,
  });
}
