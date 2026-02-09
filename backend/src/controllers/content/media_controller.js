import * as mediaService from "../../services/content/media_services.js";

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
