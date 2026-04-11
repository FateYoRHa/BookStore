// THIS CONTAINS ALL THE HELPER FUNCTIONS FOR THE DASHBOARD SUMMARY

const roundToTwoDecimals = (value) => Number(value.toFixed(2));

export const getRevenueSummaryService = async (orders = []) => {
  try {
    // Build the current date once to keep all time filters consistent.
    const now = new Date();

    // Start of the current year (Jan 1, 00:00:00.000).
    const startOfYear = new Date(now.getFullYear(), 0, 1);

    // Start of today in local server time.
    const startOfToday = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
    );

    // End of today in local server time.
    const endOfToday = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 1,
    );

    // Start date for "last 6 months" window.
    const sixMonthsAgo = new Date(now);
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
    
    const summary = orders.reduce(
      (accumulator, currentOrder) => {
        const orderAmount = Number(currentOrder?.totalAmount) || 0;
        const paidAt = currentOrder?.payment?.paidAt
          ? new Date(currentOrder.payment.paidAt)
          : null;

        accumulator.totalRevenue += orderAmount;

        if (!paidAt || Number.isNaN(paidAt.getTime())) {
          return accumulator;
        }

        if (paidAt >= startOfYear) {
          accumulator.thisYearRevenue += orderAmount;
        }

        if (paidAt >= sixMonthsAgo) {
          accumulator.lastSixMonthsRevenue += orderAmount;
        }

        if (paidAt >= startOfToday && paidAt < endOfToday) {
          accumulator.todayRevenue += orderAmount;
        }

        return accumulator;
      },
      {
        totalRevenue: 0,
        thisYearRevenue: 0,
        lastSixMonthsRevenue: 0,
        todayRevenue: 0,
      },
    );

    return {
      totalRevenue: roundToTwoDecimals(summary.totalRevenue),
      thisYearRevenue: roundToTwoDecimals(summary.thisYearRevenue),
      lastSixMonthsRevenue: roundToTwoDecimals(summary.lastSixMonthsRevenue),
      todayRevenue: roundToTwoDecimals(summary.todayRevenue),
    };
  } catch (error) {
    throw new Error(error.message || "Failed to fetch revenue summary");
  }
};
