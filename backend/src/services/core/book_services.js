import { Book, Author } from "../../model/index.js";
import * as mediaServices from "../../services/content/media_services.js";
import * as inventoryService from "../../services/core/inventory_services.js";

// FOR ADMINS ONLY
export async function createBookWithAssets(book) {
  const {
    title,
    description,
    authorCode,
    publisher,
    publicationDate,
    categoryIds,
    images,
    price,
    quantity,
  } = book;

  // Resolve author via public code
  const author = await Author.findOne({ authorCode: authorCode });
  if (!author) {
    const error = new Error("Author not found");
    error.status = 404;
    throw error;
  }

  const newBook = new Book({
    title,
    description,
    author: author._id, // <-- ObjectId reference
    publisher,
    publicationDate,
    categories: categoryIds,
    images: [],
    price,
    status: "active",
  });
  const savedBook = await newBook.save();
  if (images?.length) {
    const imageIds = await mediaServices.attachImagesToBookService(
      savedBook._id,
      images,
    );
    savedBook.images = imageIds;
  }

  await inventoryService.initializeInventory(savedBook._id, quantity);

  await savedBook.save();

  return { book };
}
export async function updateBookService(book) {
  const {
    bookCode,
    title,
    description,
    authorCode,
    publisher,
    publicationDate,
    categoryIds,
    images,
    price,
  } = book;
  const updateBook = await Book.findOneAndUpdate(
    { bookCode: bookCode },
    {
      title,
      description,
      authorCode,
      publisher,
      publicationDate,
      categoryIds,
      images: [],
      price,
    },
    { new: true },
  );
  if (images?.length) {
    const imageIds = await mediaServices.attachImagesToBookService(
      updateBook._id,
      images,
    );
    updateBook.images = imageIds;
    await updateBook.save();
  }
  if (!book) {
    const error = new Error("Book not found");
    error.status = 404;
    throw error;
  }
  return { updateBook };
}
