import { Link } from "react-router-dom";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
const AuthorCard = ({ author }) => {
  const { authorCode, penName, bio, image } = author;

  return (
    <Link to={`/authors/${authorCode}`}>
      <Card className="flex flex-col h-full hover:shadow-lg transition-transform duration-300 hover:scale-105">
        {/* Author image */}
        <CardHeader className="flex items-center justify-center pb-2">
          <Avatar className="h-24 w-24">
            <AvatarImage src={image.url} alt={image.alt} />
            <AvatarFallback>
              {penName?.slice(0, 2).toUpperCase()}
            </AvatarFallback>
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
    </Link>
  );
};

export default AuthorCard;
