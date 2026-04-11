export const dashboardRevenue = (revenue) => ({
  card1: {
    label: "Total Revenue",
    value: `₱${revenue?.revenue?.totalRevenue || 0}`,
  },
  card2: {
    label: "This Year",
    value: `₱${revenue?.revenue?.thisYearRevenue || 0}`,
  },
  card3: {
    label: "Last 6 Months",
    value: `₱${revenue?.revenue?.lastSixMonthsRevenue || 0}`,
  },
  card4: { label: "Today", value: `₱${revenue?.revenue?.todayRevenue || 0}` },
});

export const revenueChartData = (data) => {
  return data?.map((item) => ({
    date: item?.payment?.paidAt
      ? new Date(item.payment.paidAt).toLocaleDateString()
      : "",
    data1: item?.totalAmount || 0,
  }));
};

export const dashboardCustomerSummary = (customers) => ({
  card1: {
    label: "Total Customers",
    value: customers?.customerSummary?.totalCustomers || 0,
  },
  card2: {
    label: "New Customers This Year",
    value: customers?.customerSummary?.newCustomersThisYear || 0,
  },
  card3: {
    label: "New Customers Last 6 Months",
    value: customers?.customerSummary?.newCustomersLastSixMonths || 0,
  },
  card4: {
    label: "New Customers Today",
    value: customers?.customerSummary?.newCustomersToday || 0,
  },
  card5: {
    label: "Active Customers",
    value: customers?.customerSummary?.activeCustomers || 0,
  },
  card6: {
    label: "Returning Customers",
    value: customers?.customerSummary?.returningCustomers || 0,
  },
});

export const getCustomerSummaryChartData = (data) => {
  console.log(data)
  return data?.map((item) => ({
    date: item?.createdAt ? new Date(item.createdAt).toLocaleDateString() : "",
    data1: item?.createdAt ? 1 : 0,
  }));
};
