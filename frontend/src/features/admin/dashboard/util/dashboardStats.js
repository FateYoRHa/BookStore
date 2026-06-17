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

const buildPerformanceComparisonText = (comparisons) => {
  if (!comparisons) {
    return "";
  }

  const intervalLabels = {
    day: "yesterday",
    week: "last week",
    month: "last month",
    sixMonths: "prior 6 months",
    year: "last year",
  };

  return Object.entries(intervalLabels)
    .map(([period, label]) => {
      const comparison = comparisons[period];
      if (!comparison) {
        return null;
      }

      return getComparisonText(
        comparison.direction,
        comparison.changeRate || 0,
        label,
        comparison.currentValue,
        comparison.previousValue,
      );
    })
    .filter(Boolean)
    .join(", ");
};

const buildCustomerComparisonText = (comparison, cardLabel) => {
  if (!comparison) {
    return "";
  }

  const intervalMap = {
    "Total Customers": "year",
    "New Customers This Year": "year",
    "New Customers This 6 Months": "sixMonths",
    "New Customers This Month": "month",
    "New Customers This Week": "week",
    "New Customers Today": "day",
  };

  const period = intervalMap[cardLabel] || "day";
  const labelMap = {
    day: "yesterday",
    week: "last week",
    month: "last month",
    sixMonths: "prior 6 months",
    year: "last year",
  };

  const periodComparison = comparison[period];
  if (!periodComparison) {
    return "";
  }

  return getComparisonText(
    periodComparison.direction,
    periodComparison.changeRate || 0,
    labelMap[period],
    periodComparison.currentValue,
    periodComparison.previousValue,
  );
};

export const dashboardRevenue = (revenue) => {
  const revenueData = revenue?.revenue;
  return [
    {
      label: "Total Revenue",
      value: `₱${revenueData?.totalRevenue?.toLocaleString() || 0}`,
    },
    {
      label: "This Year",
      value: `₱${revenueData?.thisYearRevenue?.toLocaleString() || 0}`,
      rate: revenueData?.comparisons?.year?.changeRate || 0,
      type: mapTrendDirectionToType(revenueData?.comparisons?.year?.direction),
      comparisonPeriod: "last year",
      comparisonText: getComparisonText(
        revenueData?.comparisons?.year?.direction,
        revenueData?.comparisons?.year?.changeRate || 0,
        "last year",
        revenueData?.comparisons?.year?.currentValue,
        revenueData?.comparisons?.year?.previousValue,
        true,
      ),
    },
    {
      label: "This 6 Months",
      value: `₱${revenueData?.thisSixMonthsRevenue?.toLocaleString() || 0}`,
      rate: revenueData?.comparisons?.sixMonths?.changeRate || 0,
      type: mapTrendDirectionToType(
        revenueData?.comparisons?.sixMonths?.direction,
      ),
      comparisonPeriod: "prior 6 months",
      comparisonText: getComparisonText(
        revenueData?.comparisons?.sixMonths?.direction,
        revenueData?.comparisons?.sixMonths?.changeRate || 0,
        "the prior 6 months",
        revenueData?.comparisons?.sixMonths?.currentValue,
        revenueData?.comparisons?.sixMonths?.previousValue,
        true,
      ),
    },
    {
      label: "This Month",
      value: `₱${revenueData?.thisMonthRevenue?.toLocaleString() || 0}`,
      rate: revenueData?.comparisons?.month?.changeRate || 0,
      type: mapTrendDirectionToType(revenueData?.comparisons?.month?.direction),
      comparisonPeriod: "last month",
      comparisonText: getComparisonText(
        revenueData?.comparisons?.month?.direction,
        revenueData?.comparisons?.month?.changeRate || 0,
        "last month",
        revenueData?.comparisons?.month?.currentValue,
        revenueData?.comparisons?.month?.previousValue,
        true,
      ),
    },
    {
      label: "This Week",
      value: `₱${revenueData?.thisWeekRevenue?.toLocaleString() || 0}`,
      rate: revenueData?.comparisons?.week?.changeRate || 0,
      type: mapTrendDirectionToType(revenueData?.comparisons?.week?.direction),
      comparisonPeriod: "last week",
      comparisonText: getComparisonText(
        revenueData?.comparisons?.week?.direction,
        revenueData?.comparisons?.week?.changeRate || 0,
        "last week",
        revenueData?.comparisons?.week?.currentValue,
        revenueData?.comparisons?.week?.previousValue,
        true,
      ),
    },
    {
      label: "Today",
      value: `₱${revenueData?.todayRevenue?.toLocaleString() || 0}`,
      rate: revenueData?.comparisons?.day?.changeRate || 0,
      type: mapTrendDirectionToType(revenueData?.comparisons?.day?.direction),
      comparisonPeriod: "yesterday",
      comparisonText: getComparisonText(
        revenueData?.comparisons?.day?.direction,
        revenueData?.comparisons?.day?.changeRate || 0,
        "yesterday",
        revenueData?.comparisons?.day?.currentValue,
        revenueData?.comparisons?.day?.previousValue,
        true,
      ),
    },
  ];
};

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
    comparisonText: buildCustomerComparisonText(
      customers?.customerSummary?.comparisons?.total,
    ),
    type: mapTrendDirectionToType(
      customers?.customerSummary?.comparisons?.total?.day?.direction,
    ),
  },
  {
    label: "New Customers This Year",
    value: customers?.customerSummary?.newCustomersThisYear || 0,
    comparisonText: buildCustomerComparisonText(
      customers?.customerSummary?.comparisons?.total,
    ),
    type: mapTrendDirectionToType(
      customers?.customerSummary?.comparisons?.total?.year?.direction,
    ),
  },
  {
    label: "New Customers This 6 Months",
    value: customers?.customerSummary?.newCustomersThisSixMonths || 0,
    comparisonText: buildCustomerComparisonText(
      customers?.customerSummary?.comparisons?.total,
      "New Customers This 6 Months",
    ),
    type: mapTrendDirectionToType(
      customers?.customerSummary?.comparisons?.total?.sixMonths?.direction,
    ),
  },
  {
    label: "New Customers This Month",
    value: customers?.customerSummary?.newCustomersThisMonth || 0,
    comparisonText: buildCustomerComparisonText(
      customers?.customerSummary?.comparisons?.total,
      "New Customers This Month",
    ),
    type: mapTrendDirectionToType(
      customers?.customerSummary?.comparisons?.total?.month?.direction,
    ),
  },
  {
    label: "New Customers This Week",
    value: customers?.customerSummary?.newCustomersThisWeek || 0,
    comparisonText: buildCustomerComparisonText(
      customers?.customerSummary?.comparisons?.total,
      "New Customers This Week",
    ),
    type: mapTrendDirectionToType(
      customers?.customerSummary?.comparisons?.total?.week?.direction,
    ),
  },
  {
    label: "New Customers Today",
    value: customers?.customerSummary?.newCustomersToday || 0,
    comparisonText: buildCustomerComparisonText(
      customers?.customerSummary?.comparisons?.total,
      "New Customers Today",
    ),
    type: mapTrendDirectionToType(
      customers?.customerSummary?.comparisons?.total?.day?.direction,
    ),
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
    comparisonText: buildPerformanceComparisonText(
      performance?.performanceSummary?.comparisons?.total,
    ),
    type: mapTrendDirectionToType(
      performance?.performanceSummary?.comparisons?.total?.day?.direction,
    ),
  },
  {
    label: "Completed Orders",
    value: performance?.performanceSummary?.completedOrders || 0,
    rate: performance?.performanceSummary?.completedOrdersRate || 0,
    type: mapTrendDirectionToType(
      performance?.performanceSummary?.comparisons?.completed?.day?.direction,
    ),
    comparisonText: buildPerformanceComparisonText(
      performance?.performanceSummary?.comparisons?.completed,
    ),
  },
  {
    label: "Pending Orders",
    value: performance?.performanceSummary?.pendingOrders || 0,
    comparisonText: buildPerformanceComparisonText(
      performance?.performanceSummary?.comparisons?.pending,
    ),
    type: mapTrendDirectionToType(
      performance?.performanceSummary?.comparisons?.pending?.day?.direction,
    ),
  },
  {
    label: "Cancelled Orders",
    value: performance?.performanceSummary?.cancelledOrders || 0,
    rate: performance?.performanceSummary?.cancelledOrdersRate || 0,
    type: mapTrendDirectionToType(
      performance?.performanceSummary?.comparisons?.cancelled?.day?.direction,
    ),
    comparisonText: buildPerformanceComparisonText(
      performance?.performanceSummary?.comparisons?.cancelled,
    ),
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
