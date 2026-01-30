import Author from "../model/Author.js";
import Book from "../model/Book.js";

export async function getAuthors(req, res) {
  try {
    const authors = await Author.find();
    res.status(200).json(authors);
  } catch (error) {
    console.log("Error finding authors", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getAuthor(req, res) {
  try {
    const author = await Author.findOne({ authorId: req.params.id });
    if(!author) return res.status(404).json({message: "Author not found."})
    const books = await Book.find({ author: req.params.id });
    
    res.status(200).json({ author, books });
    // nother way of doing join sql style
    // const result = await Author.aggregate([
    //   { $match: { authorId } },
    //   {
    //     $lookup: {
    //       from: "books",
    //       localField: "authorId",
    //       foreignField: "authorId",
    //       as: "books",
    //     },
    //   },
    // ]);
  } catch (error) {
    console.log("Error finding author", error);
    res.status(404).json({ message: "Author not found" });
  }
}

export async function addAuthor(req, res) {
  try {
    const { penName, bio } = req.body;
    const newAuthor = new Author({
      penName,
      bio,
    });
    await newAuthor.save();
    res.status(201).json(newAuthor);
  } catch (error) {
    console.log("Error adding author", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function updateAuthor(req, res) {
  try {
    const { penName, bio } = req.body;
    const author = await Author.findOneAndUpdate(
      { authorId: req.params.id },
      {
        penName,
        bio,
      },
      { upsert: true, new: true },
    );
    if (!author) return res.status(404).json({ message: "Author not found" });
    res.status(200).json(author);
  } catch (error) {
    console.log("Error updating author.", error);
    res.status(500).json({ message: "Internal server error." });
  }
}

export async function deleteAuthor(req, res) {
  try {
    const books = await Book.find({ author: req.params.id });
    console.log(books.length > 0);
    if(books.length > 0) return res.status(405).json({message: "Author has book/s linked to him/her."})
    await Author.findOneAndDelete({ authorId: req.params.id });
    res.status(204).json({ message: "Author was deleted successfully" });
  } catch (error) {
    console.log("Error deleting author.", error);
    res.status(500).json({ message: "Internal server error." });
  }
}
