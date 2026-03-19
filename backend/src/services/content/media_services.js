import cloudinary from "../../config/cloudinary.js";
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
