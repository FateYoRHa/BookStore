import { Author, Book } from "../../../model/index.js";
import * as adminAuthorService from "../../../services/admin/core/admin_author_services.js";

export async function addAuthor(req, res) {
  try {
    const { penName, bio } = req.body;
    const newAuthor = await adminAuthorService.addAuthorService({
      penName,
      bio,
    });

    res.status(201).json(newAuthor);
  } catch (error) {
    console.log("Error adding author", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function updateAuthor(req, res) {
  try {
    const { penName, bio } = req.body;
    const authorCode = req.params.id;
    const author = await authorService.updateAuthorService({
      authorCode,
      penName,
      bio,
    });

    res.status(200).json(author);
  } catch (error) {
    console.log("Error updating author.", error);
    res.status(500).json({ message: "Internal server error." });
  }
}

export async function removeAuthor(req, res) {
  try {
    const books = await Book.find({ author: req.params.id });
    console.log(books.length > 0);
    if (books.length > 0)
      return res
        .status(405)
        .json({ message: "Author has book/s linked to him/her." });
    await adminAuthorService.removeAuthorService(req.params.id);
    res.status(200).json({ message: "Author was deleted successfully" });
  } catch (error) {
    console.log("Error deleting author.", error);
    res.status(500).json({ message: "Internal server error." });
  }
}
