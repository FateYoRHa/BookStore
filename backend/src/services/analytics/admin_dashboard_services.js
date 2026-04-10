import { Order } from "../../model/index.js";

export async function getDashboardRevenueService() {
  try {
    const revenueSummary = await getRevenueSummaryService();
    return {
      totalRevenue: revenueSummary.totalRevenue,
      thisYearRevenue: revenueSummary.thisYearRevenue,
      lastSixMonthsRevenue: revenueSummary.lastSixMonthsRevenue,
      todayRevenue: revenueSummary.todayRevenue,
    };
  } catch (error) {
    throw new Error(error.message || "Failed to fetch dashboard revenue");
  }
}

const getRevenueSummaryService = async () => {
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

    // One query, multiple buckets: total, this year, last 6 months, and today.
    const [summary] = await Order.aggregate([
      // Ignore non-revenue order statuses before doing any calculations.
      {
        $match: {
          status: {
            $nin: ["cancelled", "payment failed", "pending"],
          },
        },
      },
      // Compute multiple totals in parallel from the same filtered dataset.
      {
        $facet: {
          total: [
            // Sum all valid order amounts.
            {
              $group: {
                _id: null,
                amount: { $sum: "$totalAmount" },
              },
            },
          ],
          thisYear: [
            // Keep only orders created from the start of this year.
            {
              $match: {
                createdAt: { $gte: startOfYear },
              },
            },
            // Sum this year's order amounts.
            {
              $group: {
                _id: null,
                amount: { $sum: "$totalAmount" },
              },
            },
          ],
          lastSixMonths: [
            // Keep only orders created in the last 6 months.
            {
              $match: {
                createdAt: { $gte: sixMonthsAgo },
              },
            },
            // Sum order amounts for the 6-month window.
            {
              $group: {
                _id: null,
                amount: { $sum: "$totalAmount" },
              },
            },
          ],
          today: [
            // Keep only orders created today.
            {
              $match: {
                createdAt: {
                  $gte: startOfToday,
                  $lt: endOfToday,
                },
              },
            },
            // Sum today's order amounts.
            {
              $group: {
                _id: null,
                amount: { $sum: "$totalAmount" },
              },
            },
          ],
        },
      },
    ]);

    // Return numeric totals with safe fallbacks when no documents match.
    return {
      totalRevenue: summary?.total?.[0]?.amount || 0,
      thisYearRevenue: summary?.thisYear?.[0]?.amount || 0,
      lastSixMonthsRevenue: summary?.lastSixMonths?.[0]?.amount || 0,
      todayRevenue: summary?.today?.[0]?.amount || 0,
    };
  } catch (error) {
    throw new Error(error.message || "Failed to fetch revenue summary");
  }
};
