import { BookImage, Book } from "../../../model/index.js";
import cloudinary from "../../../config/cloudinary.js";

export async function attachImagesToBookService(bookId, images) {
  if (!Array.isArray(images) || images.length === 0) {
    throw new Error("Images must be a non-empty array");
  }
  const bookExists = await Book.exists({ _id: bookId });
  if (!bookExists) throw new Error("Book not found");
  await BookImage.deleteMany({ book: bookId });
  const insertedImages = await BookImage.insertMany(
    images.map((img, index) => ({
      book: bookId,
      image: { url: img.url, public_id: img.public_id },
      type: img.type || "cover",
      order: index,
    })),
  );

  return insertedImages.map((img) => img._id);
}

export const uploadToCloudinary = async (
  buffer,
  folder,
  filename,
  transformation = [],
) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: `bookstore/${folder}`,
        public_id: filename,
        resource_type: "image",
        overwrite: true,
        transformation,
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      },
    );

    stream.end(buffer);
  });
};
export async function uploadImagesService(files, type) {
  if (!files) {
    throw new Error("No file provided.");
  }

  const uploaded = await Promise.all(
    files.map((file) => uploadToCloudinary(file.buffer, type)),
  );

  return uploaded.map((img) => ({
    url: img.secure_url,
    public_id: img.public_id,
  }));
}
