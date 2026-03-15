import { CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

const ReviewList = ({ reviews }) => {
  return (
    <CardContent className="space-y-4">
      {reviews?.map((review) => (
        <div
          key={review?.customer?._id}
          className="p-4 border border-gray-200 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Avatar>
                {review?.customer?.image?.url == null ? (
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                    className="grayscale"
                  />
                ) : (
                  <AvatarImage
                    src={review?.customer?.image?.url}
                    alt={review?.customer?.name}
                  />
                )}
              </Avatar>
              <span className="font-medium">{review?.customer?.name}</span>
            </div>
            <span className="text-yellow-400">
              {"⭐".repeat(review?.rating)}
            </span>
          </div>
          <p className="">{review?.comment}</p>
        </div>
      ))}
    </CardContent>
  );
};

export default ReviewList;
