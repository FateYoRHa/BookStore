import { Book, Author } from "../../../model/index.js";
import * as mediaServices from "../content/admin_media_services.js";
import * as inventoryService from "../core/admin_inventory_services.js";

export async function getAdminBooksService() {
  // TODO filter
  const books = await Book.find()
    .populate("author", "penName")
    .populate("categories", "name")
    .populate("inventory")
    .populate("images");

  return books;
}

export async function createBookWithAssets(book) {
  try {
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
      pages,
      language,
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
      price,
      pages,
      language,
    });
    const savedBook = await newBook.save();
    if (images?.length) {
      await mediaServices.attachImagesToBookService(savedBook._id, images);
    }

    await inventoryService.initializeInventory(savedBook._id, quantity);
    return { book };
  } catch (error) {
    throw error;
  }
}
export async function updateBookService(book) {
  try {
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
      pages,
      language,
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
        price,
        pages,
        language,
      },
      { new: true },
    );
    if (images?.length) {
      await mediaServices.attachImagesToBookService(updateBook._id, images);
    }
    if (!book) {
      const error = new Error("Book not found");
      error.status = 404;
      throw error;
    }
    return { updateBook };
  } catch (error) {
    throw error;
  }
}
export async function deleteBookService(book) {
  return await Book.findOneAndUpdate(
    { bookCode: book },
    { deletedAt: new Date() },
    { new: true },
  );
}
