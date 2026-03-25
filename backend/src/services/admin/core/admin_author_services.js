import { Author, Book } from "../../../model/index.js";

export async function getAdminAuthorsService() {
  const authors = await Author.find().sort({ createdAt: -1 });
  return authors;
}
export async function getAdminAuthorsServiceList() {
  const authors = await Author.find({}, "authorCode penName");
  return authors;
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
