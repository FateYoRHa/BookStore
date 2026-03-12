import { Author, Book } from "../../model/index.js";

export async function getAuthorsService(filters) {
  const { search, page, limit } = filters;
  const filter = {};

  // Search by penName (case-insensitive regex)
  if (search) {
    filter.penName = { $regex: search, $options: "i" };
  }
  //  Pagination math
  const pageNumber = Number(page);
  const limitNumber = Number(limit);
  const skip = (pageNumber - 1) * limitNumber;

  const authors = await Author.find(filter)
    .skip(skip) // skip previous pages
    .limit(limitNumber) // limit per page
    .select("-__v");
  const total = await Author.countDocuments(filter);
  const pages = Math.ceil(total / limitNumber);
  return { authors, total, pageNumber, pages };
}

export async function getAuthorService(id) {
  const author = await Author.findOne({ authorCode: id }).populate({
    path: "books",
    populate: {
      path: "images",
      model: "BookImage",
    },
  });
  if (!author) {
    const error = new Error("Author not found");
    error.status = 404;
    throw error;
  }
  return author;
}

export async function addAuthorService(author) {
  const { penName, bio } = author;
  const newAuthor = new Author({
    penName,
    bio,
  });
  await newAuthor.save();
  return newAuthor;
}

export async function updateAuthorService(author) {
  const { authorCode, penName, bio } = author;
  const updateAuthor = await Author.findOneAndUpdate(
    { authorCode: authorCode },
    {
      penName,
      bio,
    },
    { new: true },
  );
  if (!updateAuthor) {
    const error = new Error("Author not found");
    error.status = 404;
    throw error;
  }
  return updateAuthor;
}

export async function deleteAuthorService(author) {
  return await Author.findByIdAndDelete(author);
}
