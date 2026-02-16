import { Book, Author, Inventory } from "../../model/index.js";
import * as bookService from "../../services/core/book_services.js";

// TODO transfer to services, pass filters
export async function getBooks(req, res) {
  try {
    const books = await Book.find({ status: "active" })
      .populate("author", "penName") // JOIN authors
      .populate("categories", "name") // JOIN categories
      .select("-__v");

    res.status(200).json(books);
  } catch (error) {
    console.error("Error finding books", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
// TODO transfer to services
export async function getBook(req, res) {
  try {
    const book = await Book.findOne({ bookCode: req.params.id })
      .populate("author")
      .populate("categories");

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json(book);
  } catch (error) {
    console.error("Error finding book", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

// FOR ADMINS ONLY
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
    } = req.body;

    const newBook = await bookService.createBookWithAssets({
      title,
      description,
      authorCode,
      publisher,
      publicationDate,
      categoryIds,
      images,
      price,
      quantity,
    });

    res.status(201).json(newBook);
  } catch (error) {
    console.error("Error adding book", error);
    res.status(500).json({ message: "Internal Server Error" });
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
    const bookCode = req.params.id
    const updatedBook = await bookService.updateBookService({
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
