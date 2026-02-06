import { Book, Author } from "../../model/index.js";

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

export async function getBook(req, res) {
  try {
    const book = await Book.findOne({ bookCode: req.params.code })
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
      authorCode,
      publisher,
      publicationDate,
      categoryIds,
      images,
      price,
    } = req.body;

    // Resolve author via public code
    const author = await Author.findOne({ authorCode });
    if (!author) {
      return res.status(404).json({ message: "Author not found" });
    }

    const newBook = new Book({
      title,
      author: author._id, // <-- ObjectId reference
      publisher,
      publicationDate,
      categories: categoryIds,
      images,
      price,
      status: "active",
    });

    await newBook.save();
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
      authorCode,
      publisher,
      publicationDate,
      categoryIds,
      images,
      price,
    } = req.body;
    const book = await Book.findOneAndUpdate(
      { bookCode: req.params.code },
      {
        title,
        authorCode,
        publisher,
        publicationDate,
        categoryIds,
        images,
        price,
      },
      { new: true },
    );

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json(book);
  } catch (error) {
    console.error("Error updating book", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function removeBook(req, res) {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.status(204).json({ message: "Book was deleted successfully" });
  } catch (error) {
    console.log("Error deleting book.", error);
    res.status(500).json({ message: "Internal server error." });
  }
}
