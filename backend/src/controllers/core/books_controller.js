import * as bookService from "../../services/core/book_services.js";

export async function getBooks(req, res) {
  try {
    // =========================
    // Extract query params
    // =========================
    const {
      search,
      category,
      minPrice,
      maxPrice,
      sort,
      page = 1, // default page = 1
      limit = 12, // default 12 books per page
    } = req.query;
    const { books, total, pageNumber, pages } =
      await bookService.getBooksService({
        search,
        category,
        minPrice,
        maxPrice,
        sort,
        page,
        limit,
      });

    res.status(200).json({
      books,
      total,
      page: pageNumber,
      totalPages: pages,
    });
  } catch (error) {
    console.error("Error finding books", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getBook(req, res) {
  try {
    const book = await bookService.getBookService(req.params.id);

    res.status(200).json(book);
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ message: error.message || "Internal Server Error" });
  }
}