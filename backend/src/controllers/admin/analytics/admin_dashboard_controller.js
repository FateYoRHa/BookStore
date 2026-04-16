import * as adminDashboardService from "../../../services/analytics/admin_dashboard_services.js";

export async function getDashboardRevenue(req, res) {
  try {
    const revenue = await adminDashboardService.getDashboardRevenueService();
    res.status(200).json({ revenue });
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message || "Failed to fetch dashboard revenue" });
  }
}

export async function getDashboardCustomerSummary(req, res) {
  try {
    const customerSummary =
      await adminDashboardService.getDashboardCustomerSummaryService();
    res.status(200).json({ customerSummary });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Failed to fetch dashboard customer summary",
    });
  }
}

export async function getDashboardPerformanceSummary(req, res) {
  try {
    const performanceSummary =
      await adminDashboardService.getDashboardPerformanceSummaryService();
    res.status(200).json({ performanceSummary });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Failed to fetch dashboard performance summary",
    });
  }
}
