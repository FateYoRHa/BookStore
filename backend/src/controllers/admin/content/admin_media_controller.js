import * as mediaService from "../../../services/admin/content/admin_media_services.js";

export async function attachImagesToBook(req, res) {
  try {
    const { bookId, images } = req.params;
    if (!Array.isArray(images) || images.length === 0) {
      return res
        .status(400)
        .json({ message: "Images must be a non-empty array" });
    }
    const bookImages = await mediaService.attachImagesToBookService(
      bookId,
      images,
    );
    res.status(201).json(bookImages);
  } catch (error) {
    console.log("Error attaching images to book", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function uploadImages(req, res) {
  try {
    const files = req.files;
    const urls = await mediaService.uploadImagesService(files);
    res.json({ urls });
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ message: error.image || "Internal Server Error" });
  }
}