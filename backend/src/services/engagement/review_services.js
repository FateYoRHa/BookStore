import { Review, Customer } from "../../model/index.js";

export async function addReviewService(review) {
  const { book, userId, rating, comment } = review;
  const customer = await Customer.findOne({ user: userId }, { _id: 1 });
  const createReview = await Review.create({
    book,
    customer,
    rating,
    comment,
  });

  return createReview;
}

export async function updateReviewService(review) {
  const { id, rating, comment } = review;

  const updateReview = await Review.findByIdAndUpdate(
    id,
    {
      rating,
      comment,
    },
    { new: true },
  );
  return updateReview;
}

export async function deleteReviewService(id) {
  return await Review.findByIdAndDelete(id);
}
