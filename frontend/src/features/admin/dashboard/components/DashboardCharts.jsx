import { useState, useMemo } from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import { useIsMobile } from "@/components/hooks/use-mobile";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";



const TIME_RANGE_DAYS = {
  "7d": 7,
  "30d": 30,
  "180d": 180,
  "365d": 365,
};

const toLocalDateKey = (value) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const buildDateSeries = (rawData, days) => {
  const endDate = new Date();
  endDate.setHours(23, 59, 59, 999);

  const startDate = new Date(endDate);
  startDate.setDate(startDate.getDate() - (days - 1));
  startDate.setHours(0, 0, 0, 0);

  const totalsByDay = new Map();
  rawData?.forEach((item) => {
    const key = toLocalDateKey(item?.date);
    if (!key) return;

    const amount = Number(item?.data1 ?? item?.totalAmount ?? 0);
    totalsByDay.set(key, (totalsByDay.get(key) || 0) + amount);
  });

  const series = [];
  const cursor = new Date(startDate);
  while (cursor <= endDate) {
    const key = toLocalDateKey(cursor);
    series.push({
      date: key,
      data1: totalsByDay.get(key) || 0,
    });
    cursor.setDate(cursor.getDate() + 1);
  }

  return series;
};

const DashboardCharts = ({ chartData, title, chartConfig }) => {
  const isMobile = useIsMobile();
  const [timeRange, setTimeRange] = useState("7d");
  const activeTimeRange = isMobile ? "7d" : timeRange;

  const handleTimeRangeChange = (nextRange) => {
    if (!nextRange) return;
    setTimeRange(nextRange);
  };

  const filteredData = useMemo(() => {
    const days = TIME_RANGE_DAYS[activeTimeRange] ?? 7;
    return buildDateSeries(chartData, days);
  }, [chartData, activeTimeRange]);
  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription></CardDescription>
        <CardAction>
          <ToggleGroup
            type="single"
            value={activeTimeRange}
            onValueChange={handleTimeRangeChange}
            variant="outline"
            className="hidden *:data-[slot=toggle-group-item]:px-4! @[767px]/card:flex">
            <ToggleGroupItem value="7d">Last 7 days</ToggleGroupItem>
            <ToggleGroupItem value="30d">Last 30 days</ToggleGroupItem>
            <ToggleGroupItem value="180d">Last 6 months</ToggleGroupItem>
            <ToggleGroupItem value="365d">Last 12 months</ToggleGroupItem>
          </ToggleGroup>
          <Select value={activeTimeRange} onValueChange={handleTimeRangeChange}>
            <SelectTrigger
              className="flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden"
              size="sm"
              aria-label="Select a value">
              <SelectValue placeholder="Last 3 months" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="7d" className="rounded-lg">
                Last 7 days
              </SelectItem>
              <SelectItem value="30d" className="rounded-lg">
                Last 30 days
              </SelectItem>
              <SelectItem value="180d" className="rounded-lg">
                Last 6 months
              </SelectItem>
              <SelectItem value="365d" className="rounded-lg">
                Last 12 months
              </SelectItem>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full">
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="data1" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--chart-1)"
                  stopOpacity={0.5}
                />
                <stop
                  offset="95%"
                  stopColor="var(--chart-1)"
                  stopOpacity={0.05}
                />
              </linearGradient>

              <linearGradient id="data2" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--chart-2)"
                  stopOpacity={0.5}
                />
                <stop
                  offset="95%"
                  stopColor="var(--chart-2)"
                  stopOpacity={0.05}
                />
              </linearGradient>
            </defs>
            <CartesianGrid
              vertical={false}
              stroke="oklch(var(--border))"
              strokeOpacity={0.3}
            />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="data1"
              stroke="var(--chart-1)"
              fill="url(#data1)"
              strokeWidth={2}
            />
            
            <Area
              dataKey="data2"
              stroke="var(--chart-2)"
              fill="url(#data2)"
              strokeWidth={2}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default DashboardCharts;
