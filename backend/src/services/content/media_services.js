import { BookImage } from "../../model/index.js";

export async function attachImagesToBookService(bookId, images) {
  if (!Array.isArray(images) || images.length === 0) {
    throw new Error("Images must be a non-empty array");
  }

  const bookExists = await Book.exists({ _id: bookId });
  if (!bookExists) throw new Error("Book not found");

  await BookImage.deleteMany({ book: bookId });

  const insertedImages = await BookImage.insertMany(
    images.map((img, index) => ({
      book: bookId,
      url: img.url,
      type: img.type || "cover",
      order: index,
    })),
  );

  return insertedImages.map((img) => img._id);
}
