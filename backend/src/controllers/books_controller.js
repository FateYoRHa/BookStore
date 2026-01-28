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
    const book = await Book.findOne({bookId: req.params.id});
    res.status(200).json(book);
  } catch (error) {
    console.log("Error finding book.", error);
    res.status(404).json({ message: "Book not found." });
  }
}
export async function addBook(req, res) {
  try {
    const { title, author, publisher, publicationDate, img } = req.body;
    const newBook = new Book({
      title,
      author,
      publisher,
      publicationDate: Date.parse(publicationDate),
      img,
    });
    await newBook.save();
    res.status(201).json(newBook)
  } catch (error) {
    console.log("Error adding book.", error)
    res.status(500).json({message: "Internal server error."})
  }
}
