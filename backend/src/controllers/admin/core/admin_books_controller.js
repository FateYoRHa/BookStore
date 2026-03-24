import * as adminBookService from "../../../services/admin/core/admin_book_services.js";

export async function getAdminBooks(req, res) {
  try {
    const books = await adminBookService.getAdminBooksService();
    res.status(200).json(books);
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ message: error.message || "Internal Server Error." });
  }
}

export async function addBook(req, res) {
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
    } = req.body;

    const newBook = await adminBookService.createBookWithAssets({
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
    });

    res.status(201).json(newBook);
  } catch (error) {
    console.error("Error adding book", error);
    res
      .status(error.status || 500)
      .json({ message: error.message || "Internal Server Error" });
  }
}
export async function updateBook(req, res) {
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
    } = req.body;
    const bookCode = req.params.id;
    const updatedBook = await adminBookService.updateBookService({
      bookCode,
      title,
      description,
      authorCode,
      publisher,
      publicationDate,
      categoryIds,
      images,
      price,
    });

    res.status(200).json(updatedBook);
  } catch (error) {
    console.error("Error updating book", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function removeBook(req, res) {
  try {
    const bookCode = req.params.id;
    await adminBookService.deleteBookService(bookCode);
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting book", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
export async function restoreBook(req, res) {
  try {
    const bookCode = req.params.id;
    const restoredBook = await adminBookService.restoreBookService(bookCode);
    res.status(200).json(restoredBook);
  } catch (error) {
    console.error("Error restoring book", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
