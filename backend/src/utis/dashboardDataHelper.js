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

export const getCustomerSummaryService = async (
  customers = [],
  customerOrders = [],
) => {
  try {
    // Build the current date once to keep all time filters consistent.
    const now = new Date();
    const lastSevenDaysStart = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

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
        const isActive = currentCustomer?.isActive || false;
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
