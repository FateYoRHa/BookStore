import { Book, Category } from "../../model/index.js";
import { trackEventService } from "../analytics/analytics_services.js";

export async function getBooksService(filters) {
  try {
    const { search, category, minPrice, maxPrice, sort, page, limit } = filters;
    // =========================
    //  Build dynamic filter object
    const filter = { deletedAt: null }; // exclude deleted books

    // Search by title (case-insensitive regex)
    if (search) {
      filter.title = { $regex: search, $options: "i" };
    }

    // Filter by category
    if (category) {
      const cat = await Category.findOne({ name: category }, { _id: 1 });
      filter.categories = cat;
    }

    //  Price range filter
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    // Sorting logic
    let sortOption = { createdAt: -1 }; // default newest

    if (sort === "price-asc") sortOption = { price: 1 };
    if (sort === "price-desc") sortOption = { price: -1 };

    //  Pagination math
    const pageNumber = Number(page);
    const limitNumber = Number(limit);
    const skip = (pageNumber - 1) * limitNumber;

    //  Query database with filters + pagination
    const books = await Book.find(filter)
      .populate("author", "penName")
      .populate("categories", "name")
      .populate("images")
      .sort(sortOption)
      .skip(skip) // skip previous pages
      .limit(limitNumber) // limit per page
      .select("-__v");

    //  Get total count for frontend pagination
    const total = await Book.countDocuments(filter);
    const pages = Math.ceil(total / limitNumber);
    return { books, total, pageNumber, pages };
  } catch (error) {
    throw error;
  }
}
export async function getBookService(id) {
  try {
    // const code = id
    const book = await Book.findOne({ bookCode: id })
      .populate("author", "penName")
      .populate("categories", "name")
      .populate("images")
      .populate({
        path: "reviews",
        select: "rating comment",
        populate: {
          path: "customer",
          model: "Customer",
          select: "name image",
        },
        options: { sort: { createdAt: -1 } },
      })
      .populate("inventory", "quantity status");

    if (!book) {
      const error = new Error("Book not found.");
      error.status = 401;
      throw error;
    }

    // UPDATE ANALYTICS for TRACKING
    await Book.updateOne(
      { bookCode: id },
      { $inc: { "analytics.viewCount": 1 } },
    );
    // TRACK EVENT
    await trackEventService({
      type: "view_book",
      book: book._id,
    });
    return book;
  } catch (error) {
    throw error;
  }
}
