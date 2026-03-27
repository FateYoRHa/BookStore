import { Author, Book } from "../../../model/index.js";
import { deleteImagesService } from "../../../services/admin/content/admin_media_services.js";
export async function getAdminAuthorsService() {
  const authors = await Author.find().sort({ createdAt: -1 });
  return authors;
}
export async function getAdminAuthorsServiceList() {
  const authors = await Author.find({}, "authorCode penName");
  return authors;
}

export async function addAuthorService(author) {
  const { image, penName, bio } = author;
  const newAuthor = new Author({
    penName,
    bio,
    image: {
      url: image.url,
      public_id: image.public_id,
      altText: penName,
    },
  });
  await newAuthor.save();
  return newAuthor;
}

export async function updateAuthorService(author) {
  const { authorCode, image, penName, bio } = author;
  const authorImage = await Author.findOne({ authorCode: authorCode }, "image");
  const publicId = authorImage?.image?.public_id;

  if (publicId) {
    await deleteImagesService([publicId]);
  }
  const updateAuthor = await Author.findOneAndUpdate(
    { authorCode: authorCode },
    {
      penName,
      bio,
      image: {
        url: image.url,
        public_id: image.public_id,
        altText: penName,
      },
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

export async function removeAuthorService(author) {
  return await Author.findByIdAndUpdate(
    author,
    { deletedAt: new Date() },
    { new: true },
  );
}
export async function restoreAuthorService(author) {
  return await Author.findByIdAndUpdate(
    author,
    { deletedAt: null },
    { new: true },
  );
}
