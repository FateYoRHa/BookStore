// THIS CONTAINS ALL THE HELPER FUNCTIONS FOR THE DASHBOARD SUMMARY

const roundToTwoDecimals = (value) => Number(value.toFixed(2));

const getTrendFromPeriods = (currentValue = 0, previousValue = 0) => {
  // Avoid divide-by-zero while still surfacing direction for empty previous periods.
  if (previousValue === 0) {
    if (currentValue === 0) {
      return {
        currentValue: 0,
        previousValue: 0,
        changeAmount: 0,
        changeRate: 0,
        direction: "flat",
      };
    }

    return {
      currentValue: roundToTwoDecimals(currentValue),
      previousValue: 0,
      changeAmount: roundToTwoDecimals(currentValue),
      changeRate: 100,
      direction: "up",
    };
  }

  const delta = currentValue - previousValue;
  const rate = (delta / previousValue) * 100;

  return {
    currentValue: roundToTwoDecimals(currentValue),
    previousValue: roundToTwoDecimals(previousValue),
    changeAmount: roundToTwoDecimals(delta),
    changeRate: roundToTwoDecimals(Math.abs(rate)),
    direction: delta > 0 ? "up" : delta < 0 ? "down" : "flat",
  };
};

const getStartOfWeek = (date) => {
  // Use Monday as first day of week for admin reporting.
  const startOfDay = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
  );
  const day = startOfDay.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  startOfDay.setDate(startOfDay.getDate() + diff);
  return startOfDay;
};

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

    // Previous day boundaries.
    const startOfYesterday = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() - 1,
    );
    const endOfYesterday = startOfToday;

    // Current and previous week boundaries.
    const startOfThisWeek = getStartOfWeek(now);
    const startOfLastWeek = new Date(startOfThisWeek);
    startOfLastWeek.setDate(startOfLastWeek.getDate() - 7);
    const endOfLastWeek = startOfThisWeek;

    // Current and previous month boundaries.
    const startOfThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const endOfLastMonth = startOfThisMonth;

    // Current and previous year boundaries.
    const startOfLastYear = new Date(now.getFullYear() - 1, 0, 1);
    const endOfLastYear = startOfYear;

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

        if (paidAt >= startOfLastYear && paidAt < endOfLastYear) {
          accumulator.lastYearRevenue += orderAmount;
        }

        if (paidAt >= sixMonthsAgo) {
          accumulator.lastSixMonthsRevenue += orderAmount;
        }

        if (paidAt >= startOfToday && paidAt < endOfToday) {
          accumulator.todayRevenue += orderAmount;
        }

        if (paidAt >= startOfYesterday && paidAt < endOfYesterday) {
          accumulator.yesterdayRevenue += orderAmount;
        }

        if (paidAt >= startOfThisWeek) {
          accumulator.thisWeekRevenue += orderAmount;
        }

        if (paidAt >= startOfLastWeek && paidAt < endOfLastWeek) {
          accumulator.lastWeekRevenue += orderAmount;
        }

        if (paidAt >= startOfThisMonth) {
          accumulator.thisMonthRevenue += orderAmount;
        }

        if (paidAt >= startOfLastMonth && paidAt < endOfLastMonth) {
          accumulator.lastMonthRevenue += orderAmount;
        }

        return accumulator;
      },
      {
        totalRevenue: 0,
        thisYearRevenue: 0,
        lastYearRevenue: 0,
        lastSixMonthsRevenue: 0,
        todayRevenue: 0,
        yesterdayRevenue: 0,
        thisWeekRevenue: 0,
        lastWeekRevenue: 0,
        thisMonthRevenue: 0,
        lastMonthRevenue: 0,
      },
    );

    const comparisons = {
      day: getTrendFromPeriods(summary.todayRevenue, summary.yesterdayRevenue),
      week: getTrendFromPeriods(summary.thisWeekRevenue, summary.lastWeekRevenue),
      month: getTrendFromPeriods(
        summary.thisMonthRevenue,
        summary.lastMonthRevenue,
      ),
      year: getTrendFromPeriods(summary.thisYearRevenue, summary.lastYearRevenue),
    };

    return {
      totalRevenue: roundToTwoDecimals(summary.totalRevenue),
      thisYearRevenue: roundToTwoDecimals(summary.thisYearRevenue),
      lastYearRevenue: roundToTwoDecimals(summary.lastYearRevenue),
      lastSixMonthsRevenue: roundToTwoDecimals(summary.lastSixMonthsRevenue),
      thisMonthRevenue: roundToTwoDecimals(summary.thisMonthRevenue),
      lastMonthRevenue: roundToTwoDecimals(summary.lastMonthRevenue),
      thisWeekRevenue: roundToTwoDecimals(summary.thisWeekRevenue),
      lastWeekRevenue: roundToTwoDecimals(summary.lastWeekRevenue),
      todayRevenue: roundToTwoDecimals(summary.todayRevenue),
      yesterdayRevenue: roundToTwoDecimals(summary.yesterdayRevenue),
      comparisons,
    };
  } catch (error) {
    throw new Error(error.message || "Failed to fetch revenue summary");
  }
};

export const getCustomerSummaryService = async (
  customers = [],
  customerOrders = [],
) => {
  try {
    // Build the current date once to keep all time filters consistent.
    const now = new Date();
    const lastSevenDaysStart = new Date(
      now.getTime() - 7 * 24 * 60 * 60 * 1000,
    );

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

    // Start date for a 90-day window used to mark returning customers.
    const threeMonthsAgo = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);

    const completedOrdersByCustomerInLastThreeMonths = customerOrders.reduce(
      (countsByCustomer, order) => {
        const isCompleted = order.status === "delivered";
        const updatedAt = order.updatedAt ? new Date(order.updatedAt) : null;
        const isWithinThreeMonths =
          updatedAt &&
          !Number.isNaN(updatedAt.getTime()) &&
          updatedAt >= threeMonthsAgo;
        const customerId = order?.customer?.toString();

        if (!customerId || !isCompleted || !isWithinThreeMonths) {
          return countsByCustomer;
        }

        countsByCustomer.set(
          customerId,
          (countsByCustomer.get(customerId) || 0) + 1,
        );

        return countsByCustomer;
      },
      new Map(),
    );

    // true only when a customer has at least 2 completed orders in the last 3 months
    const summary = customers.reduce(
      (accumulator, currentCustomer) => {
        const isActive = currentCustomer?.isActive !== false;
        const customerId = currentCustomer?._id?.toString();
        const completedOrdersInLastThreeMonths = customerId
          ? completedOrdersByCustomerInLastThreeMonths.get(customerId) || 0
          : 0;
        const hasOrders = completedOrdersInLastThreeMonths >= 2;

        const createdAt = currentCustomer?.createdAt
          ? new Date(currentCustomer.createdAt)
          : null;

        // DATE STUFF
        if (!createdAt || Number.isNaN(createdAt.getTime())) {
          return accumulator;
        }

        if (createdAt >= startOfYear) {
          accumulator.newCustomersThisYear += 1;
        }

        if (createdAt >= sixMonthsAgo) {
          accumulator.newCustomersLastSixMonths += 1;
        }

        if (createdAt >= lastSevenDaysStart) {
          accumulator.newCustomersLastSevenDays += 1;
        }

        if (createdAt >= startOfToday && createdAt < endOfToday) {
          accumulator.newCustomersToday += 1;
        }

        // Active and Returning Customers Section
        if (isActive) {
          accumulator.activeCustomers += 1;
        }
        if (hasOrders) {
          accumulator.returningCustomers += 1;
        }

        return accumulator;
      },
      {
        activeCustomers: 0,
        returningCustomers: 0,
        newCustomersThisYear: 0,
        newCustomersLastSixMonths: 0,
        newCustomersLastSevenDays: 0,
        newCustomersToday: 0,
      },
    );

    return {
      activeCustomers: summary.activeCustomers,
      returningCustomers: summary.returningCustomers,
      totalCustomers: summary.totalCustomers,
      newCustomersThisYear: summary.newCustomersThisYear,
      newCustomersLastSixMonths: summary.newCustomersLastSixMonths,
      newCustomersLastSevenDays: summary.newCustomersLastSevenDays,
      newCustomersToday: summary.newCustomersToday,
    };
  } catch (error) {
    throw new Error(error.message || "Failed to fetch customer summary");
  }
};

export async function getDashboardPerformanceSummaryHelper(orders = []) {
  try {
    const summary = orders.reduce((accumulator, currentOrder) => {
      const status = currentOrder?.status;
      accumulator[status] = (accumulator[status] || 0) + 1;
      return accumulator;
    }, {});

    return {
      completedOrders: summary.delivered || 0,
      pendingOrders: summary.pending || 0,
      cancelledOrders: summary.cancelled || 0,
      completedOrdersRate: orders.length
        ? roundToTwoDecimals(((summary.delivered || 0) / orders.length) * 100)
        : 0,
      cancelledOrdersRate: orders.length
        ? roundToTwoDecimals(((summary.cancelled || 0) / orders.length) * 100)
        : 0,
    };
  } catch (error) {
    throw new Error(error.message || "Failed to fetch performance summary");
  }
}
