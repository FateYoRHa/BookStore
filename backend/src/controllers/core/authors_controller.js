import { Author, Book } from "../../model/index.js";
import * as authorService from "../../services/core/author_services.js";

export async function getAuthors(req, res) {
  try {
    const { search, page = 1, limit = 12 } = req.query;
    const { authors, total, pageNumber, pages } =
      await authorService.getAuthorsService({ search, page, limit });
    res
      .status(200)
      .json({ authors, total, page: pageNumber, totalPages: pages });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getAuthor(req, res) {
  try {
    const author = await authorService.getAuthorService(req.params.id);

    res.status(200).json(author);
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ message: error.message || "Internal Server Error" });
  }
}
