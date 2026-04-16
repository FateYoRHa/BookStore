import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TrendingDown, TrendingUp } from "lucide-react";
const DashboardCards = ({ data }) => {
  return (
    <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      {data?.map((card) => (
        <Card
          key={card.label}
          className="rounded-lg shadow-md p-6 bg-[var(--card)] text-[var(--card-foreground)] border border-[var(--border)]">
          <CardHeader>
            <CardDescription>{card.label}</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {card.value}
            </CardTitle>
            {card.rate && (
              <CardAction>
                <Badge
                  variant="secondary"
                  className={`${card.type === "negative" ? "bg-[var(--color-negative-light)] text-destructive" : "bg-[var(--color-positive-light)] text-[var(--color-positive)]"}`}>
                  {card.type === "negative" ? (
                    <TrendingDown className="size-4" />
                  ) : (
                    <TrendingUp className="size-4" />
                  )}
                  {card.rate}%
                </Badge>
              </CardAction>
            )}
          </CardHeader>
          {/* 
          "bg-[var(--color-positive-light)] text-[var(--color-positive)]">
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Trending up this month <TrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Visitors for the last 6 months
          </div>
        </CardFooter> */}
        </Card>
      ))}
    </div>
  );
};

export default DashboardCards;
