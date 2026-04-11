import { Order } from "../../model/index.js";
import {
  ORDER_STATUSES,
  PAYMENT_STATUSES,
} from "../../constants/constant_values.js";
import { getCustomerSummaryService, getRevenueSummaryService } from "../../utis/dashboardDataHelper.js";

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
    const totalCustomers = await Customer.find().select("createdAt");
    const summary = await getCustomerSummaryService(totalCustomers);
    console.log("Customer summary:", summary);
    return {
      totalCustomers: summary.totalCustomers,
      newCustomersThisYear: summary.newCustomersThisYear,
      newCustomersLastSixMonths: summary.newCustomersLastSixMonths,
      newCustomersToday: summary.newCustomersToday,
    };
  } catch (error) {
    throw new Error(error.message || "Failed to fetch customer summary");
  }
}
