import { Customer, Order } from "../../model/index.js";
import {
  ORDER_STATUSES,
  PAYMENT_STATUSES,
} from "../../constants/constant_values.js";
import {
  getCustomerSummaryService,
  getRevenueSummaryService,
} from "../../utis/dashboardDataHelper.js";

const NON_REVENUE_ORDER_STATUSES = [
  ORDER_STATUSES.CANCELLED,
  ORDER_STATUSES.FAILED,
  ORDER_STATUSES.PENDING,
];

export async function getDashboardRevenueService() {
  try {
    const summary = await Order.aggregate([
      {
        $match: {
          status: { $nin: NON_REVENUE_ORDER_STATUSES },
        },
      },
      {
        $lookup: {
          from: "payments",
          let: { paymentId: "$payment" },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$_id", "$$paymentId"] },
              },
            },
            {
              $match: {
                status: PAYMENT_STATUSES.PAID,
              },
            },
            {
              $project: {
                paidAt: 1,
                status: 1,
              },
            },
          ],
          as: "payment",
        },
      },
      {
        $unwind: "$payment",
      },
      {
        $project: {
          totalAmount: 1,
          payment: 1,
        },
      },
    ]);
    const revenueSummary = await getRevenueSummaryService(summary);

    return {
      summary,
      totalRevenue: revenueSummary.totalRevenue,
      thisYearRevenue: revenueSummary.thisYearRevenue,
      lastSixMonthsRevenue: revenueSummary.lastSixMonthsRevenue,
      todayRevenue: revenueSummary.todayRevenue,
    };
  } catch (error) {
    throw new Error(error.message || "Failed to fetch dashboard revenue");
  }
}

export async function getDashboardCustomerSummaryService() {
  try {
    const [customers, totalCustomers] = await Promise.all([
      Customer.find().select({ createdAt: 1, isActive: 1 }).lean(),
      Customer.countDocuments(),
    ]);
    const customerOrders = await Order.find({
      customer: { $in: customers.map((c) => c._id) },
    })
      .select({ customer: 1, status: 1, updatedAt: 1 })
      .lean();

    const summary = await getCustomerSummaryService(customers, customerOrders);
    return {
      customers,
      totalCustomers,
      newCustomersThisYear: summary.newCustomersThisYear,
      newCustomersLastSixMonths: summary.newCustomersLastSixMonths,
      newCustomersLastSevenDays: summary.newCustomersLastSevenDays,
      newCustomersToday: summary.newCustomersToday,
      activeCustomers: summary.activeCustomers,
      returningCustomers: summary.returningCustomers,
    };
  } catch (error) {
    throw new Error(error.message || "Failed to fetch customer summary");
  }
}

export async function getDashboardPerformanceSummaryService() {
  try {
    
  } catch (error) {
    throw new Error(error.message || "Failed to fetch performance summary");
  }
}
