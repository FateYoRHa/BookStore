import * as reviewService from "../../services/engagement/review_services.js";

export async function addReview(req, res) {
  try {
    const userId = req.user.id;
    const { book, rating, comment } = req.body;
    const review = await reviewService.addReviewService({
      book,
      userId,
      rating,
      comment,
    });
    res.status(201).json(review);
  } catch (error) {
    console.log("Error Creating Review", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function updateReview(req, res) {
  try {
    const { id, rating, comment } = req.body;
    const review = await reviewService.updateReviewService({
      id,
      rating,
      comment,
    });
    res.status(201).json(review);
  } catch (error) {
    console.log("Error Updating Review", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function deleteReview(req, res) {
  try {
    // TODO soft delete
    await reviewService.deleteReviewService(req.params.id);
    res.status(200).json({ message: "Review Deleted Successfully" });
  } catch (error) {
    console.log("Error Creating Review", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
