import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { AspectRatio } from "@/components/ui/aspect-ratio";

export default function CategoryCard({ category }) {
  const navigate = useNavigate();

  function handleClick() {
    navigate(`/books?category=${category.name}`);
  }
  return (
    <Card
      onClick={handleClick}
      className="cursor-pointer hover:shadow-lg hover:-translate-y-1 hover:scale-[1.02] transition w-full">
      <CardContent className="p-4 flex flex-col items-center space-y-2">
        {/* Category Image */}
        <div className="w-full">
          <AspectRatio ratio={1 / 1}>
            <img
              src={category?.image?.url}
              alt={category.name}
              className="h-full w-full object-cover rounded-md"
            />
          </AspectRatio>
        </div>

        {/* Category Name */}
        <h3 className="text-lg font-semibold text-center">{category.name}</h3>

        {/* Description */}
        {category.description && (
          <p className="text-sm text-muted-foreground text-center line-clamp-2">
            {category.description}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
