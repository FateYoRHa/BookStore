import { Book, Author } from "../../model/index.js";
import * as mediaServices from "../../services/content/media_services.js";
import * as inventoryService from "../../services/core/inventory_services.js";

export async function getBooksService(filters) {
  try {
    const { search, category, minPrice, maxPrice, sort, page, limit } = filters;
    // =========================
    // 2️⃣ Build dynamic filter object
    const filter = {};

    // 🔎 Search by title (case-insensitive regex)
    if (search) {
      filter.title = { $regex: search, $options: "i" };
    }

    // 📚 Filter by category
    if (category) {
      filter.categories = category;
    }

    // 💰 Price range filter
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    // 3️⃣ Sorting logic
    let sortOption = { createdAt: -1 }; // default newest

    if (sort === "price-asc") sortOption = { price: 1 };
    if (sort === "price-desc") sortOption = { price: -1 };

    // 4️⃣ Pagination math
    const pageNumber = Number(page);
    const limitNumber = Number(limit);
    const skip = (pageNumber - 1) * limitNumber;

    // 5️⃣ Query database with filters + pagination
    const books = await Book.find(filter)
      .populate("author", "penName")
      .populate("categories", "name")
      .populate("images")
      .sort(sortOption)
      .skip(skip) // skip previous pages
      .limit(limitNumber) // limit per page
      .select("-__v");

    // 6️⃣ Get total count for frontend pagination
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
        path: "reviews", select:"rating comment",populate: {
          path: "customer",
          model: "Customer",
          select: "name"
      }})
      .populate("inventory", "quantity status");

    if (!book) {
      const error = new Error("Book not found.");
      error.status = 401;
      throw error;
    }
    return book;
  } catch (error) {
    throw error;
  }
}
// FOR ADMINS ONLY
export async function createBookWithAssets(book) {
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
  } = book;

  // Resolve author via public code
  const author = await Author.findOne({ authorCode: authorCode });
  if (!author) {
    const error = new Error("Author not found");
    error.status = 404;
    throw error;
  }

  const newBook = new Book({
    title,
    description,
    author: author._id, // <-- ObjectId reference
    publisher,
    publicationDate,
    categories: categoryIds,
    price,
    pages,
    language,
  });
  const savedBook = await newBook.save();
  if (images?.length) {
    await mediaServices.attachImagesToBookService(savedBook._id, images);
  }

  await inventoryService.initializeInventory(savedBook._id, quantity);
  return { book };
}
export async function updateBookService(book) {
  const {
    bookCode,
    title,
    description,
    authorCode,
    publisher,
    publicationDate,
    categoryIds,
    images,
    price,
    pages,
    language,
  } = book;
  const updateBook = await Book.findOneAndUpdate(
    { bookCode: bookCode },
    {
      title,
      description,
      authorCode,
      publisher,
      publicationDate,
      categoryIds,
      price,
      pages,
      language,
    },
    { new: true },
  );
  if (images?.length) {
    await mediaServices.attachImagesToBookService(updateBook._id, images);
  }
  if (!book) {
    const error = new Error("Book not found");
    error.status = 404;
    throw error;
  }
  return { updateBook };
}
