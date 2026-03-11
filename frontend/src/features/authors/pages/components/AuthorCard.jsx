import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
const AuthorCard = ({ author }) => {
  const { penName, bio, image } = author;

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      {/* Author image */}
      <CardHeader className="flex items-center justify-center pb-2">
        <Avatar className="h-24 w-24">
          <AvatarImage src={image.url} alt={image.alt} />
          <AvatarFallback>{penName?.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
      </CardHeader>

      {/* Author info */}
      <CardContent className="text-center space-y-2">
        {/* Pen Name */}
        <h3 className="text-lg font-semibold">{penName}</h3>

        {/* Bio */}
        <p className="text-sm text-muted-foreground line-clamp-3">{bio}</p>
      </CardContent>
    </Card>
  );
};

export default AuthorCard;
