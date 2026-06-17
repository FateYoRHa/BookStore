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

    // Current and previous 6-month boundaries.
    const startOfThisSixMonths = new Date(now);
    startOfThisSixMonths.setMonth(startOfThisSixMonths.getMonth() - 6);
    const startOfLastSixMonths = new Date(startOfThisSixMonths);
    startOfLastSixMonths.setMonth(startOfLastSixMonths.getMonth() - 6);
    const endOfLastSixMonths = startOfThisSixMonths;

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

        if (paidAt >= startOfThisSixMonths) {
          accumulator.thisSixMonthsRevenue += orderAmount;
        }

        if (paidAt >= startOfLastSixMonths && paidAt < endOfLastSixMonths) {
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
        thisSixMonthsRevenue: 0,
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
      sixMonths: getTrendFromPeriods(
        summary.thisSixMonthsRevenue,
        summary.lastSixMonthsRevenue,
      ),
      year: getTrendFromPeriods(summary.thisYearRevenue, summary.lastYearRevenue),
    };

    return {
      totalRevenue: roundToTwoDecimals(summary.totalRevenue),
      thisYearRevenue: roundToTwoDecimals(summary.thisYearRevenue),
      lastYearRevenue: roundToTwoDecimals(summary.lastYearRevenue),
      thisSixMonthsRevenue: roundToTwoDecimals(summary.thisSixMonthsRevenue),
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
    const now = new Date();

    const startOfToday = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
    );
    const endOfToday = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 1,
    );

    const startOfYesterday = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() - 1,
    );
    const endOfYesterday = startOfToday;

    const startOfThisWeek = getStartOfWeek(now);
    const startOfLastWeek = new Date(startOfThisWeek);
    startOfLastWeek.setDate(startOfLastWeek.getDate() - 7);
    const endOfLastWeek = startOfThisWeek;

    const startOfThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const endOfLastMonth = startOfThisMonth;

    const startOfThisSixMonths = new Date(now);
    startOfThisSixMonths.setMonth(startOfThisSixMonths.getMonth() - 6);
    const startOfLastSixMonths = new Date(startOfThisSixMonths);
    startOfLastSixMonths.setMonth(startOfLastSixMonths.getMonth() - 6);
    const endOfLastSixMonths = startOfThisSixMonths;

    const startOfThisYear = new Date(now.getFullYear(), 0, 1);
    const startOfLastYear = new Date(now.getFullYear() - 1, 0, 1);
    const endOfLastYear = startOfThisYear;

    const statusBucket = {
      delivered: "completedOrders",
      pending: "pendingOrders",
      cancelled: "cancelledOrders",
    };

    const summary = orders.reduce(
      (accumulator, currentOrder) => {
        const status = currentOrder?.status;
        const updatedAt = currentOrder?.updatedAt
          ? new Date(currentOrder.updatedAt)
          : null;
        const statusKey = statusBucket[status];

        accumulator.totalOrders += 1;
        if (statusKey) {
          accumulator[statusKey] += 1;
        }

        if (!updatedAt || Number.isNaN(updatedAt.getTime())) {
          return accumulator;
        }

        const isToday = updatedAt >= startOfToday && updatedAt < endOfToday;
        const isYesterday = updatedAt >= startOfYesterday && updatedAt < endOfYesterday;
        const isThisWeek = updatedAt >= startOfThisWeek;
        const isLastWeek = updatedAt >= startOfLastWeek && updatedAt < endOfLastWeek;
        const isThisMonth = updatedAt >= startOfThisMonth;
        const isLastMonth = updatedAt >= startOfLastMonth && updatedAt < endOfLastMonth;
        const isThisSixMonths = updatedAt >= startOfThisSixMonths;
        const isLastSixMonths =
          updatedAt >= startOfLastSixMonths && updatedAt < endOfLastSixMonths;
        const isThisYear = updatedAt >= startOfThisYear;
        const isLastYear = updatedAt >= startOfLastYear && updatedAt < endOfLastYear;

        if (isToday) {
          accumulator.todayOrders += 1;
          if (statusKey) {
            accumulator[`${statusKey}Today`] += 1;
          }
        }

        if (isYesterday) {
          accumulator.yesterdayOrders += 1;
          if (statusKey) {
            accumulator[`${statusKey}Yesterday`] += 1;
          }
        }

        if (isThisWeek) {
          accumulator.thisWeekOrders += 1;
          if (statusKey) {
            accumulator[`${statusKey}ThisWeek`] += 1;
          }
        }

        if (isLastWeek) {
          accumulator.lastWeekOrders += 1;
          if (statusKey) {
            accumulator[`${statusKey}LastWeek`] += 1;
          }
        }

        if (isThisMonth) {
          accumulator.thisMonthOrders += 1;
          if (statusKey) {
            accumulator[`${statusKey}ThisMonth`] += 1;
          }
        }

        if (isLastMonth) {
          accumulator.lastMonthOrders += 1;
          if (statusKey) {
            accumulator[`${statusKey}LastMonth`] += 1;
          }
        }

        if (isThisSixMonths) {
          accumulator.thisSixMonthsOrders += 1;
          if (statusKey) {
            accumulator[`${statusKey}ThisSixMonths`] += 1;
          }
        }

        if (isLastSixMonths) {
          accumulator.lastSixMonthsOrders += 1;
          if (statusKey) {
            accumulator[`${statusKey}LastSixMonths`] += 1;
          }
        }

        if (isThisYear) {
          accumulator.thisYearOrders += 1;
          if (statusKey) {
            accumulator[`${statusKey}ThisYear`] += 1;
          }
        }

        if (isLastYear) {
          accumulator.lastYearOrders += 1;
          if (statusKey) {
            accumulator[`${statusKey}LastYear`] += 1;
          }
        }

        return accumulator;
      },
      {
        totalOrders: 0,
        completedOrders: 0,
        pendingOrders: 0,
        cancelledOrders: 0,
        todayOrders: 0,
        yesterdayOrders: 0,
        thisWeekOrders: 0,
        lastWeekOrders: 0,
        thisMonthOrders: 0,
        lastMonthOrders: 0,
        thisSixMonthsOrders: 0,
        lastSixMonthsOrders: 0,
        thisYearOrders: 0,
        lastYearOrders: 0,
        completedOrdersToday: 0,
        completedOrdersYesterday: 0,
        completedOrdersThisWeek: 0,
        completedOrdersLastWeek: 0,
        completedOrdersThisMonth: 0,
        completedOrdersLastMonth: 0,
        completedOrdersThisSixMonths: 0,
        completedOrdersLastSixMonths: 0,
        completedOrdersThisYear: 0,
        completedOrdersLastYear: 0,
        pendingOrdersToday: 0,
        pendingOrdersYesterday: 0,
        pendingOrdersThisWeek: 0,
        pendingOrdersLastWeek: 0,
        pendingOrdersThisMonth: 0,
        pendingOrdersLastMonth: 0,
        pendingOrdersThisSixMonths: 0,
        pendingOrdersLastSixMonths: 0,
        pendingOrdersThisYear: 0,
        pendingOrdersLastYear: 0,
        cancelledOrdersToday: 0,
        cancelledOrdersYesterday: 0,
        cancelledOrdersThisWeek: 0,
        cancelledOrdersLastWeek: 0,
        cancelledOrdersThisMonth: 0,
        cancelledOrdersLastMonth: 0,
        cancelledOrdersThisSixMonths: 0,
        cancelledOrdersLastSixMonths: 0,
        cancelledOrdersThisYear: 0,
        cancelledOrdersLastYear: 0,
      },
    );

    const comparisons = {
      total: {
        day: getTrendFromPeriods(summary.todayOrders, summary.yesterdayOrders),
        week: getTrendFromPeriods(summary.thisWeekOrders, summary.lastWeekOrders),
        month: getTrendFromPeriods(summary.thisMonthOrders, summary.lastMonthOrders),
        sixMonths: getTrendFromPeriods(
          summary.thisSixMonthsOrders,
          summary.lastSixMonthsOrders,
        ),
        year: getTrendFromPeriods(summary.thisYearOrders, summary.lastYearOrders),
      },
      completed: {
        day: getTrendFromPeriods(
          summary.completedOrdersToday,
          summary.completedOrdersYesterday,
        ),
        week: getTrendFromPeriods(
          summary.completedOrdersThisWeek,
          summary.completedOrdersLastWeek,
        ),
        month: getTrendFromPeriods(
          summary.completedOrdersThisMonth,
          summary.completedOrdersLastMonth,
        ),
        sixMonths: getTrendFromPeriods(
          summary.completedOrdersThisSixMonths,
          summary.completedOrdersLastSixMonths,
        ),
        year: getTrendFromPeriods(
          summary.completedOrdersThisYear,
          summary.completedOrdersLastYear,
        ),
      },
      pending: {
        day: getTrendFromPeriods(
          summary.pendingOrdersToday,
          summary.pendingOrdersYesterday,
        ),
        week: getTrendFromPeriods(
          summary.pendingOrdersThisWeek,
          summary.pendingOrdersLastWeek,
        ),
        month: getTrendFromPeriods(
          summary.pendingOrdersThisMonth,
          summary.pendingOrdersLastMonth,
        ),
        sixMonths: getTrendFromPeriods(
          summary.pendingOrdersThisSixMonths,
          summary.pendingOrdersLastSixMonths,
        ),
        year: getTrendFromPeriods(
          summary.pendingOrdersThisYear,
          summary.pendingOrdersLastYear,
        ),
      },
      cancelled: {
        day: getTrendFromPeriods(
          summary.cancelledOrdersToday,
          summary.cancelledOrdersYesterday,
        ),
        week: getTrendFromPeriods(
          summary.cancelledOrdersThisWeek,
          summary.cancelledOrdersLastWeek,
        ),
        month: getTrendFromPeriods(
          summary.cancelledOrdersThisMonth,
          summary.cancelledOrdersLastMonth,
        ),
        sixMonths: getTrendFromPeriods(
          summary.cancelledOrdersThisSixMonths,
          summary.cancelledOrdersLastSixMonths,
        ),
        year: getTrendFromPeriods(
          summary.cancelledOrdersThisYear,
          summary.cancelledOrdersLastYear,
        ),
      },
    };

    return {
      totalOrders: summary.totalOrders,
      completedOrders: summary.completedOrders,
      pendingOrders: summary.pendingOrders,
      cancelledOrders: summary.cancelledOrders,
      completedOrdersRate: orders.length
        ? roundToTwoDecimals((summary.completedOrders / orders.length) * 100)
        : 0,
      cancelledOrdersRate: orders.length
        ? roundToTwoDecimals((summary.cancelledOrders / orders.length) * 100)
        : 0,
      comparisons,
    };
  } catch (error) {
    throw new Error(error.message || "Failed to fetch performance summary");
  }
}
