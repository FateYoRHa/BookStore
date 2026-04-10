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
