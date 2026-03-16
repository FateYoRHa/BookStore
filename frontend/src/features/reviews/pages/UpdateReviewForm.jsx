import { useState } from "react";
import { Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CardContent } from "@/components/ui/card";

const UpdateReviewForm = ({ id, onSubmitReview }) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!rating) return;

    onSubmitReview({
      id,
      rating,
      comment,
    });

    setRating(0);
    setComment("");
  };
  const isFormValid = rating > 0 && comment.trim() !== "";

  return (
    <form onSubmit={handleSubmit}>
      <CardContent className="space-y-4">
        {/* Rating */}
        <div className="space-y-2">
          <p className="text-sm font-medium">Your Rating</p>

          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => {
              const active = star <= (hoverRating || rating);

              return (
                <Star
                  key={star}
                  className={`h-7 w-7 cursor-pointer transition-colors ${
                    active
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-muted-foreground"
                  }`}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setRating(star)}
                />
              );
            })}
          </div>
        </div>

        {/* Review Text */}
        <div className="space-y-2">
          <p className="text-sm font-medium">Your Review</p>

          <Textarea
            placeholder="Write your thoughts about this book..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>

        {/* Submit */}
        <Button type="submit" disabled={!isFormValid}>
          Submit Review
        </Button>
      </CardContent>
    </form>
  );
};

export default UpdateReviewForm;
