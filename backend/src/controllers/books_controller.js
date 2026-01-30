import Author from "../model/Author.js";
import Book from "../model/Book.js";

export async function getBooks(req, res) {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    console.log("Error finding books.", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getBook(req, res) {
  try {
    const book = await Book.findOne({ bookId: req.params.id });
    res.status(200).json(book);
  } catch (error) {
    console.log("Error finding book.", error);
    res.status(404).json({ message: "Book not found." });
  }
}
export async function addBook(req, res) {
  try {
    const { title, author, publisher, publicationDate, genre, img } = req.body;

    // normalize
    const normalizedAuthorId = author.trim();

    const authorId = await Author.findOne({ authorId: normalizedAuthorId });
    // console.log("Author: ID", authorId._id);
    if (!authorId) return res.status(404).json({ message: "Author not found" });
    const newBook = new Book({
      title,
      author: authorId.authorId,
      publisher,
      publicationDate: Date.parse(publicationDate),
      genre,
      img,
    });

    await newBook.save();
    res.status(201).json(newBook);
  } catch (error) {
    console.log("Error adding book.", error);
    res.status(500).json({ message: "Internal server error." });
  }
}
export async function updateBook(req, res) {
  try {
    const { title, author, publisher, publicationDate, genre, img } = req.body;
    const book = await Book.findOneAndUpdate(
      { bookId: req.params.id },
      {
        title,
        author,
        publisher,
        publicationDate: Date.parse(publicationDate),
        genre,
        img,
      },
      { upsert: true, new: true },
    );
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.status(200).json(book);
  } catch (error) {
    console.log("Error updating book.", error);
    res.status(500).json({ message: "Internal server error." });
  }
}

export async function deleteBook(req, res) {
  try {
    await Book.findOneAndDelete({ bookId: req.params.id }).sort();
    res.status(204).json({ message: "Book was deleted successfully" });
  } catch (error) {
    console.log("Error deleting book.", error);
    res.status(500).json({ message: "Internal server error." });
  }
}
