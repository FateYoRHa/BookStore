export const dashboardRevenue = (revenue) => [
  {
    label: "Total Revenue",
    value: `₱${revenue?.revenue?.totalRevenue?.toLocaleString() || 0}`,
  },
  {
    label: "This Year",
    value: `₱${revenue?.revenue?.thisYearRevenue?.toLocaleString() || 0}`,
  },
  {
    label: "Last 6 Months",
    value: `₱${revenue?.revenue?.lastSixMonthsRevenue?.toLocaleString() || 0}`,
  },
  {
    label: "Today",
    value: `₱${revenue?.revenue?.todayRevenue?.toLocaleString() || 0}`,
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
