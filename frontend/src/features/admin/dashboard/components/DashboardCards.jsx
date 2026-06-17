import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Minus, TrendingDown, TrendingUp } from "lucide-react";

const badgeClassByType = {
  negative: "bg-[var(--color-negative-light)] text-destructive",
  neutral: "bg-muted text-muted-foreground",
  positive: "bg-[var(--color-positive-light)] text-[var(--color-positive)]",
};

const highlightPercentage = (text, type) => {
  // Parse comparison text and highlight all percentage values only.
  const percentPattern = /(\d+\.?\d*)%/g;
  const percentHighlightColor = {
    negative: "text-destructive font-bold",
    neutral: "text-muted-foreground font-bold",
    positive: "text-[var(--color-positive)] font-bold",
  };

  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = percentPattern.exec(text)) !== null) {
    const [fullMatch, percentValue] = match;
    parts.push({ text: text.substring(lastIndex, match.index), isPercent: false });
    parts.push({ text: `${percentValue}%`, isPercent: true });
    lastIndex = match.index + fullMatch.length;
  }

  if (parts.length === 0) {
    return text;
  }

  parts.push({ text: text.substring(lastIndex), isPercent: false });

  return (
    <>
      {parts.map((part, index) =>
        part.isPercent ? (
          <span
            key={index}
            className={percentHighlightColor[type] || percentHighlightColor.positive}>
            {part.text}
          </span>
        ) : (
          <span key={index}>{part.text}</span>
        ),
      )}
    </>
  );
};

const getFooterTitle = (cardLabel = "", metricName = "Metric") => {
  // Build a readable footer line from common dashboard period labels.
  if (cardLabel.includes("Today")) {
    return `${metricName} today`;
  }
  if (cardLabel.includes("This Week")) {
    return `${metricName} this week`;
  }
  if (cardLabel.includes("This Month")) {
    return `${metricName} this month`;
  }
  if (cardLabel.includes("This Year")) {
    return `${metricName} this year`;
  }
  if (cardLabel.includes("Last 6 Months")) {
    return `${metricName} in the last 6 months`;
  }
  if (cardLabel.toLowerCase().includes("total")) {
    return `Total ${metricName.toLowerCase()} snapshot`;
  }

  return `${cardLabel} overview`;
};

const DashboardCards = ({ data, metricName = "Metric" }) => {
  return (
    <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      {data?.map((card) => (
        <Card
          key={card.label}
          className="rounded-lg shadow-md p-6 bg-card text-card-foreground border border-border">
          <CardHeader>
            <CardDescription>{card.label}</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {card.value}
            </CardTitle>
            {card.rate !== undefined && card.rate !== null && (
              <CardAction>
                <Badge
                  variant="secondary"
                  className={
                    badgeClassByType[card.type] || badgeClassByType.positive
                  }>
                  {card.type === "negative" ? (
                    <TrendingDown className="size-4" />
                  ) : card.type === "neutral" ? (
                    <Minus className="size-4" />
                  ) : (
                    <TrendingUp className="size-4" />
                  )}
                  {card.rate}%
                </Badge>
              </CardAction>
            )}
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">
              {card.footerTitle || getFooterTitle(card.label, metricName)}
              {card.type === "negative" ? (
                <TrendingDown className="size-4" />
              ) : card.type === "neutral" ? (
                <Minus className="size-4" />
              ) : (
                <TrendingUp className="size-4" />
              )}
            </div>
            {card.comparisonText && (
              <div className="text-muted-foreground">
                {metricName} is {highlightPercentage(card.comparisonText, card.type)}
              </div>
            )}
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default DashboardCards;
