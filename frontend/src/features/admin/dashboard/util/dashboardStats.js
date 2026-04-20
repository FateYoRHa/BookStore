const mapTrendDirectionToType = (direction) => {
  if (direction === "down") {
    return "negative";
  }

  if (direction === "flat") {
    return "neutral";
  }

  return "positive";
};

const formatValue = (value, isRevenue = false) => {
  // Format a numeric value with locale support and optional currency prefix.
  const formattedNum = Number(value)?.toLocaleString() || 0;
  return isRevenue ? `₱${formattedNum}` : formattedNum;
};

const getComparisonText = (
  direction,
  changeRate,
  comparisonPeriod,
  currentValue,
  previousValue,
  isRevenue = false,
) => {
  // Build comparison text with both current and previous period values.
  if (direction === "flat") {
    return `Unchanged compared to ${comparisonPeriod}`;
  }

  const action = direction === "up" ? "up" : "down";
  const trendText = `${action} ${changeRate.toFixed(1)}%`;

  // Include previous period value if available.
  if (currentValue !== undefined && previousValue !== undefined) {
    const current = formatValue(currentValue, isRevenue);
    const previous = formatValue(previousValue, isRevenue);
    return `${trendText} compared to ${comparisonPeriod} (${previous} → ${current})`;
  }

  return `${trendText} compared to ${comparisonPeriod}`;
};

export const dashboardRevenue = (revenue) => [
  {
    label: "Total Revenue",
    value: `₱${revenue?.revenue?.totalRevenue?.toLocaleString() || 0}`,
  },
  {
    label: "This Year",
    value: `₱${revenue?.revenue?.thisYearRevenue?.toLocaleString() || 0}`,
    rate: revenue?.revenue?.comparisons?.year?.changeRate || 0,
    type: mapTrendDirectionToType(
      revenue?.revenue?.comparisons?.year?.direction,
    ),
    comparisonPeriod: "last year",
    comparisonText: getComparisonText(
      revenue?.revenue?.comparisons?.year?.direction,
      revenue?.revenue?.comparisons?.year?.changeRate || 0,
      "last year",
      revenue?.revenue?.comparisons?.year?.currentValue,
      revenue?.revenue?.comparisons?.year?.previousValue,
      true,
    ),
  },
  {
    label: "Last 6 Months",
    value: `₱${revenue?.revenue?.lastSixMonthsRevenue?.toLocaleString() || 0}`,
  },
  {
    label: "This Month",
    value: `₱${revenue?.revenue?.thisMonthRevenue?.toLocaleString() || 0}`,
    rate: revenue?.revenue?.comparisons?.month?.changeRate || 0,
    type: mapTrendDirectionToType(
      revenue?.revenue?.comparisons?.month?.direction,
    ),
    comparisonPeriod: "last month",
    comparisonText: getComparisonText(
      revenue?.revenue?.comparisons?.month?.direction,
      revenue?.revenue?.comparisons?.month?.changeRate || 0,
      "last month",
      revenue?.revenue?.comparisons?.month?.currentValue,
      revenue?.revenue?.comparisons?.month?.previousValue,
      true,
    ),
  },
  {
    label: "This Week",
    value: `₱${revenue?.revenue?.thisWeekRevenue?.toLocaleString() || 0}`,
    rate: revenue?.revenue?.comparisons?.week?.changeRate || 0,
    type: mapTrendDirectionToType(
      revenue?.revenue?.comparisons?.week?.direction,
    ),
    comparisonPeriod: "last week",
    comparisonText: getComparisonText(
      revenue?.revenue?.comparisons?.week?.direction,
      revenue?.revenue?.comparisons?.week?.changeRate || 0,
      "last week",
      revenue?.revenue?.comparisons?.week?.currentValue,
      revenue?.revenue?.comparisons?.week?.previousValue,
      true,
    ),
  },
  {
    label: "Today",
    value: `₱${revenue?.revenue?.todayRevenue?.toLocaleString() || 0}`,
    rate: revenue?.revenue?.comparisons?.day?.changeRate || 0,
    type: mapTrendDirectionToType(
      revenue?.revenue?.comparisons?.day?.direction,
    ),
    comparisonPeriod: "yesterday",
    comparisonText: getComparisonText(
      revenue?.revenue?.comparisons?.day?.direction,
      revenue?.revenue?.comparisons?.day?.changeRate || 0,
      "yesterday",
      revenue?.revenue?.comparisons?.day?.currentValue,
      revenue?.revenue?.comparisons?.day?.previousValue,
      true,
    ),
  },
];

export const revenueChartData = (data) => {
  return data?.map((item) => ({
    date: item?.payment?.paidAt
      ? new Date(item.payment.paidAt).toLocaleDateString()
      : "",
    data1: item?.totalAmount || 0,
  }));
};

export const dashboardCustomerSummary = (customers) => [
  {
    label: "Total Customers",
    value: customers?.customerSummary?.totalCustomers || 0,
  },
  {
    label: "New Customers This Year",
    value: customers?.customerSummary?.newCustomersThisYear || 0,
  },
  {
    label: "New Customers Last 6 Months",
    value: customers?.customerSummary?.newCustomersLastSixMonths || 0,
  },
  {
    label: "New Customers Last 7 Days",
    value: customers?.customerSummary?.newCustomersLastSevenDays || 0,
  },
  {
    label: "New Customers Today",
    value: customers?.customerSummary?.newCustomersToday || 0,
  },
  {
    label: "Active Customers",
    value: customers?.customerSummary?.activeCustomers || 0,
  },
  {
    label: "Returning Customers",
    value: customers?.customerSummary?.returningCustomers || 0,
  },
];

export const getCustomerSummaryChartData = (data) => {
  return data?.map((item) => ({
    date: item?.createdAt || "",
    data1: item?.createdAt ? 1 : 0,
  }));
};

export const dashboardPerformaceSummary = (performance) => [
  {
    label: "Total Orders",
    value: performance?.performanceSummary?.totalOrders || 0,
  },
  {
    label: "Completed Orders",
    value: performance?.performanceSummary?.completedOrders || 0,
    rate: performance?.performanceSummary?.completedOrdersRate || 0,
    type: "positive",
  },
  {
    label: "Pending Orders",
    value: performance?.performanceSummary?.pendingOrders || 0,
  },
  {
    label: "Cancelled Orders",
    value: performance?.performanceSummary?.cancelledOrders || 0,
    rate: performance?.performanceSummary?.cancelledOrdersRate || 0,
    type: "negative",
  },
];

export const getPerformanceSummaryChartData = (data) => {
  return data?.map((item) => ({
    date: item?.updatedAt ? new Date(item.updatedAt).toLocaleDateString() : "",
    data1: item?.status === "delivered" ? 1 : 0,
    data2: item?.status === "pending" ? 1 : 0,
    data3: item?.status === "cancelled" ? 1 : 0,
  }));
};
